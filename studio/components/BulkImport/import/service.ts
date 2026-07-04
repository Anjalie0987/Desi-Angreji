import { SanityClient } from 'sanity';
import { ValidatedRow } from '../validation/types';
import { BulkImportConfig } from '../useBulkImport';
import { generateSlug } from '../validation/utils';
import { ImportProgressState, ImportSummaryStats } from './types';
import { ImageService } from './imageService';
import { ImportLogger } from '../history/logger';
import { buildCompleteStory } from '../../../utils/storyGenerator';
import { normalizeContent } from '../../../utils/portableTextParser';

// Helper to find a matched term or return null
async function fetchLookupMaps(client: SanityClient) {
  const categories = await client.fetch<{_id: string, name: string}[]>(`*[_type == "category"]{_id, name}`);
  const authors = await client.fetch<{_id: string, name: string}[]>(`*[_type == "author"]{_id, name}`);
  
  const categoryMap = new Map(categories.map(c => [c.name.toLowerCase().trim(), c._id]));
  const authorMap = new Map(authors.map(a => [a.name.toLowerCase().trim(), a._id]));
  
  return { categoryMap, authorMap };
}

export class ImportService {
  private client: SanityClient;
  private abortController: AbortController;
  private onProgress: (progress: Partial<ImportProgressState>) => void;
  private imageService: ImageService;
  private logger: ImportLogger;
  private BATCH_SIZE = 25;

  constructor(client: SanityClient, onProgress: (progress: Partial<ImportProgressState>) => void, logger: ImportLogger) {
    this.client = client;
    this.onProgress = onProgress;
    this.logger = logger;
    this.abortController = new AbortController();
    this.imageService = new ImageService(client);
  }

  cancel() {
    this.abortController.abort();
  }

  private async mapRowToDocument(
    row: ValidatedRow, 
    mapping: Record<string, string>, 
    config: BulkImportConfig,
    categoryMap: Map<string, string>,
    authorMap: Map<string, string>
  ): Promise<any> {
    const { originalRow, validation } = row;

    const getValue = (field: string) => {
      const col = Object.keys(mapping).find(k => mapping[k] === field);
      return col ? originalRow[col] : undefined;
    };

    let isDraft = false;
    if (config.status === 'draft') isDraft = true;
    else if (config.status === 'published') isDraft = false;
    else if (config.status === 'csv') {
      const csvStatus = getValue('status');
      if (String(csvStatus).toLowerCase() === 'draft') isDraft = true;
    }

    const title = String(getValue('title') || 'Untitled');
    
    // Use the portableTextParser to normalize content from various formats
    const rawContent = getValue('content');
    const content = await normalizeContent(rawContent);

    const videoUrl = getValue('videoUrl') ? String(getValue('videoUrl')) : undefined;

    let featuredImageId: string | undefined;
    const featuredImage = getValue('featuredImage');
    if (featuredImage) {
      featuredImageId = this.imageService.getCachedAssetId(String(featuredImage));
    }

    let categoryId: string | undefined;
    if (config.categoryMode === 'select') {
      categoryId = config.categoryId;
    } else {
      const catName = getValue('category');
      if (catName) {
        const catStr = String(catName).trim();
        const mappedId = config.csvCategoryMapping[catStr];
        categoryId = mappedId === 'create' ? categoryMap.get(catStr.toLowerCase()) : mappedId;
      }
    }

    let authorId: string | undefined;
    if (config.authorMode === 'select') {
      authorId = config.authorId;
    } else if (config.authorMode === 'csv') {
      const authName = getValue('author');
      if (authName) {
        const authStr = String(authName).trim();
        const mappedId = config.csvAuthorMapping[authStr];
        authorId = mappedId === 'create' ? authorMap.get(authStr.toLowerCase()) : mappedId;
      }
    }

    return buildCompleteStory({
      title,
      content,
      categoryId,
      authorId,
      featuredImageId,
      status: isDraft ? 'draft' : 'published',
      videoUrl
    });
  }

  async execute(rows: ValidatedRow[], mapping: Record<string, string>, config: BulkImportConfig) {
    this.logger.logEvent('Import Started');
    const startTime = Date.now();
    let imported = 0;
    let failed = 0;
    let skipped = 0;
    let exactSkipped = 0;
    let possibleImported = 0;

    // Filter out invalid rows and apply duplicate resolution logic
    const validRows = rows.filter((r, index) => {
      if (r.validation.status === 'invalid') {
        skipped++;
        this.logger.logError(index + 1, r.originalRow['title'] || 'Unknown', 'Invalid data format or missing required fields');
        return false;
      }
      if (r.duplicate?.status === 'exact' && config.exactDuplicateAction === 'skip') {
        exactSkipped++;
        return false;
      }
      if (r.duplicate?.status === 'possible') {
        if (config.possibleDuplicateAction === 'skip') {
          skipped++;
          return false;
        } else {
          possibleImported++;
        }
      }
      return true;
    });

    this.onProgress({
      status: 'importing',
      total: validRows.length,
      processed: 0,
      totalBatches: Math.ceil(validRows.length / this.BATCH_SIZE),
    });

    const { categoryMap, authorMap } = await fetchLookupMaps(this.client);

    // Pre-create any missing categories or authors that were mapped as "create"
    if (config.categoryMode === 'csv') {
      for (const [csvCat, action] of Object.entries(config.csvCategoryMapping)) {
        if (action === 'create' && !categoryMap.has(csvCat.toLowerCase())) {
          this.onProgress({ currentTitle: `Creating Category: ${csvCat}...` });
          const newDoc = await this.client.create({
            _type: 'category',
            name: csvCat,
            slug: { current: generateSlug(csvCat) },
            active: true,
            showInNavigation: true
          });
          categoryMap.set(csvCat.toLowerCase(), newDoc._id);
        }
      }
    }

    if (config.authorMode === 'csv') {
      for (const [csvAuth, action] of Object.entries(config.csvAuthorMapping)) {
        if (action === 'create' && !authorMap.has(csvAuth.toLowerCase())) {
          this.onProgress({ currentTitle: `Creating Author: ${csvAuth}...` });
          const newDoc = await this.client.create({
            _type: 'author',
            name: csvAuth,
            slug: { current: generateSlug(csvAuth) }
          });
          authorMap.set(csvAuth.toLowerCase(), newDoc._id);
        }
      }
    }

    const batches = [];
    for (let i = 0; i < validRows.length; i += this.BATCH_SIZE) {
      batches.push(validRows.slice(i, i + this.BATCH_SIZE));
    }

    for (let i = 0; i < batches.length; i++) {
      if (this.abortController.signal.aborted) {
        break; // Cancelled
      }

      const batch = batches[i];
      
      // Phase 5: Image Processing Pipeline
      // Extract unique image URLs for this batch and process them
      const imageUrls = batch
        .map(row => {
          const col = Object.keys(mapping).find(k => mapping[k] === 'featuredImage');
          return col ? row.originalRow[col] : undefined;
        })
        .filter(url => url && typeof url === 'string') as string[];

      if (imageUrls.length > 0) {
        await this.imageService.processImages(imageUrls, this.onProgress, this.abortController.signal);
      }

      const tx = this.client.transaction();
      
      this.onProgress({
        currentBatch: i + 1,
        currentTitle: `Batch ${i + 1} processing...`,
      });

      const docs = [];
      for (let j = 0; j < batch.length; j++) {
        const row = batch[j];
        try {
          const doc = await this.mapRowToDocument(row, mapping, config, categoryMap, authorMap);
          docs.push(doc);
        } catch (err: any) {
          // Normalization failed, mark as failed
          console.error('Content processing failed for row:', err);
          failed++;
          this.logger.logError((i * this.BATCH_SIZE) + j + 1, row.originalRow['title'] || 'Unknown', err.message || 'Content conversion failed');
        }
      }

      docs.forEach(doc => tx.create(doc));

      if (docs.length > 0) {
        try {
          await tx.commit();
          imported += docs.length;
          
          // Hooks removed as Generation Engine runs prior to insert
        } catch (err) {
          console.error('Batch failed, falling back to individual inserts', err);
          // Fallback: insert individually to skip only the failing ones
          for (const doc of docs) {
            if (this.abortController.signal.aborted) break;
            try {
              await this.client.create(doc);
              imported++;
            } catch (individualErr: any) {
              console.error('Failed to insert story:', doc.title, individualErr);
              failed++;
              this.logger.logError(0, doc.title, individualErr.message || 'Sanity insert failed');
            }
          }
        }
      }

      // Update progress
      const elapsedMs = Date.now() - startTime;
      const processed = imported + failed + skipped; // Total processed items
      const avgTimePerItem = elapsedMs / processed;
      const remaining = validRows.length - processed;
      const estimatedRemainingMs = avgTimePerItem * remaining;

      this.onProgress({
        processed,
        estimatedRemainingMs,
        currentTitle: docs.length > 0 ? docs[docs.length - 1]?.title : '',
      });
    }

    const durationMs = Date.now() - startTime;
    
    const summary: ImportSummaryStats = {
      total: rows.length,
      imported,
      failed,
      skipped,
      durationMs,
      publishingMode: config.status as any,
      imagesProcessed: this.imageService.stats.processed,
      imagesUploaded: this.imageService.stats.uploaded,
      imagesFailed: this.imageService.stats.failed,
      imagesReused: this.imageService.stats.reused,
      exactSkipped,
      possibleImported,
    };

    if (!this.abortController.signal.aborted) {
      this.logger.logEvent('Stories Created');
      await this.logger.save({
        totalRows: rows.length,
        importedSuccessfully: imported,
        failed,
        skipped: skipped + exactSkipped,
        duplicateStories: exactSkipped + possibleImported,
        publishingMode: config.status as any,
      });
    }

    this.onProgress({
      status: this.abortController.signal.aborted ? 'canceled' : 'completed',
      summary,
    });
  }
}
