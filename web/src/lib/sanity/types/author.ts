import { BaseDocument, SeoData } from './common';

export interface SocialProfile {
  platform: string;
  url: string;
}

export interface Author extends BaseDocument {
  name: string;
  slug: string;
  photo?: string;
  designation?: string;
  bio?: string;
  email?: string;
  website?: string;
  socialProfiles?: SocialProfile[];
  active?: boolean;
  seo?: SeoData;
}
