import type { PortableTextBlock } from 'next-sanity';

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  canonicalUrl?: string;
  openGraphImage?: string;
}

export interface SocialDistributionData {
  previewStory?: string;
  continueReadingCta?: string;
  shareUrl?: string;
  facebookCaption?: string;
  instagramCaption?: string;
  threadsCaption?: string;
  whatsappCaption?: string;
  linkedinCaption?: string;
  xCaption?: string;
  suggestedHashtags?: string[];
  storyBackgroundImage?: string;
  socialThumbnail?: string;
}

export interface RichContent {
  content: PortableTextBlock[];
}

export interface BaseDocument {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
  _rev: string;
}
