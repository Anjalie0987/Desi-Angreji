import { BaseDocument, SeoData } from './common';

export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  icon?: string;
  colorTheme?: string;
  showInNavigation?: boolean;
  showOnHomepage?: boolean;
  featured?: boolean;
  active?: boolean;
  displayOrder?: number;
  seo?: SeoData;
}
