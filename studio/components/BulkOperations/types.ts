export type BulkActionType = 
  | 'category'
  | 'author'
  | 'status'
  | 'featured'
  | 'publish'
  | 'unpublish'
  | 'delete';

export interface BulkOperationState {
  status: 'idle' | 'running' | 'completed' | 'error';
  total: number;
  processed: number;
  failed: number;
  action: BulkActionType | null;
  durationMs: number;
}

export interface StorySummary {
  _id: string;
  title: string;
  slug?: { current: string };
  status: string;
  featured: boolean;
  category?: { _ref: string, title?: string };
  author?: { _ref: string, name?: string };
  _updatedAt: string;
}
