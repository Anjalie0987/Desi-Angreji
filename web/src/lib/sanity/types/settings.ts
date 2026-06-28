import { SeoData } from './common';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  favicon?: string;
  contactEmail?: string;
  contactNumber?: string;
  socialLinks?: SocialLink[];
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleAdSenseId?: string;
  defaultSeo?: SeoData;
  footerText?: string;
}
