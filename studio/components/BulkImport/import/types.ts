export type ImportStatus = 'idle' | 'importing' | 'completed' | 'canceled';

export interface ImportSummaryStats {
  total: number;
  imported: number;
  failed: number;
  skipped: number;
  durationMs: number;
  publishingMode: 'draft' | 'published';
  imagesProcessed: number;
  imagesUploaded: number;
  imagesFailed: number;
  imagesReused: number;
  exactSkipped: number;
  possibleImported: number;
}

export interface ImportProgressState {
  status: ImportStatus;
  currentBatch: number;
  totalBatches: number;
  currentTitle: string;
  processed: number;
  total: number;
  estimatedRemainingMs: number;
  summary: ImportSummaryStats | null;
  imagePhase?: 'Downloading Images...' | 'Uploading Images...' | 'Processing Images...' | null;
  currentImage?: string;
  imagesProcessed: number;
  imagesTotal: number;
}
