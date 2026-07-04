import { BaseDocument, SeoData } from './common';

export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  showInNavigation?: boolean;
  navigationOrder?: number;
  showOnHomepage?: boolean;
  featured?: boolean;
  active?: boolean;
  seo?: SeoData;
}
