import { SanityClient } from 'sanity';
import { IMAGE_CONSTANTS } from './imageConstants';
import { ImportProgressState } from './types';

export class ImageService {
  private client: SanityClient;
  private imageCache: Map<string, string>;
  public stats = {
    processed: 0,
    uploaded: 0,
    failed: 0,
    reused: 0,
  };

  constructor(client: SanityClient) {
    this.client = client;
    this.imageCache = new Map<string, string>();
  }

  private isValidUrl(urlStr: string): boolean {
    try {
      const url = new URL(urlStr);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  private async fetchImageWithTimeout(url: string, signal: AbortSignal): Promise<Blob> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), IMAGE_CONSTANTS.TIMEOUT_MS);
    
    // Wire up parent abort signal
    const onParentAbort = () => controller.abort();
    if (signal.aborted) controller.abort();
    signal.addEventListener('abort', onParentAbort);

    try {
      const response = await fetch(url, { signal: controller.signal });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type') || '';
      if (!IMAGE_CONSTANTS.SUPPORTED_MIME_TYPES.includes(contentType.split(';')[0].toLowerCase())) {
        throw new Error(`Unsupported MIME type: ${contentType}`);
      }
      
      const blob = await response.blob();
      
      if (blob.size > IMAGE_CONSTANTS.MAX_SIZE_BYTES) {
        throw new Error(`Image size exceeds limit: ${blob.size} bytes`);
      }
      
      return blob;
    } finally {
      clearTimeout(timeout);
      signal.removeEventListener('abort', onParentAbort);
    }
  }

  public getCachedAssetId(url: string): string | undefined {
    return this.imageCache.get(url);
  }

  public async processImages(
    urls: string[], 
    onProgress: (progress: Partial<ImportProgressState>) => void,
    abortSignal: AbortSignal
  ) {
    const uniqueUrls = Array.from(new Set(urls.filter(url => url && this.isValidUrl(url))));
    const urlsToProcess = uniqueUrls.filter(url => !this.imageCache.has(url));

    // Update reused stats early
    const reusedCount = uniqueUrls.length - urlsToProcess.length;
    this.stats.reused += reusedCount;
    this.stats.processed += reusedCount;

    if (urlsToProcess.length === 0) return;

    onProgress({
      imagePhase: 'Processing Images...',
      imagesTotal: urlsToProcess.length,
      imagesProcessed: 0,
    });

    for (let i = 0; i < urlsToProcess.length; i += IMAGE_CONSTANTS.MAX_CONCURRENT) {
      if (abortSignal.aborted) break;

      const chunk = urlsToProcess.slice(i, i + IMAGE_CONSTANTS.MAX_CONCURRENT);
      
      await Promise.allSettled(chunk.map(async (url) => {
        if (abortSignal.aborted) return;
        
        try {
          onProgress({ imagePhase: 'Downloading Images...', currentImage: url });
          const blob = await this.fetchImageWithTimeout(url, abortSignal);
          
          if (abortSignal.aborted) return;

          onProgress({ imagePhase: 'Uploading Images...', currentImage: url });
          
          // Upload to Sanity
          const asset = await this.client.assets.upload('image', blob, {
            filename: url.split('/').pop() || 'image',
          });

          this.imageCache.set(url, asset._id);
          this.stats.uploaded++;
        } catch (err) {
          console.error(`Failed to process image: ${url}`, err);
          this.stats.failed++;
        } finally {
          this.stats.processed++;
          onProgress({ imagesProcessed: i + chunk.length }); // Approx progress
        }
      }));
    }

    onProgress({ imagePhase: null, currentImage: undefined });
  }
}
