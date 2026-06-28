import { BaseDocument } from './common';

export interface MediaAsset extends BaseDocument {
  title: string;
  altText: string;
  description?: string;
  type: 'image' | 'video';
  imageFile?: string;
  videoUrl?: string;
}
