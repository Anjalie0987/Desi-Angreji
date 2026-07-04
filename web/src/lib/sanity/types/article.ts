import { BaseDocument, SeoData, SocialDistributionData } from './common';
import { Category } from './category';
import { Author } from './author';
import type { PortableTextBlock } from 'next-sanity';

export interface Tag {
  name: string;
  slug: string;
}

export interface ArticleCard extends BaseDocument {
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageLqip?: string;
  videoUrl?: string;
  publishDate?: string;
  updatedDate?: string;
  status: 'draft' | 'published';
  featured?: boolean;
  trending?: boolean;
  breakingNews?: boolean;
  editorsPick?: boolean;
  estimatedReadingTime?: number;
  category?: Pick<Category, '_id' | 'name' | 'slug'>;
  author?: Pick<Author, '_id' | 'name' | 'slug' | 'photo' | 'designation' | 'website'>;
}

export interface ArticleDetail extends ArticleCard {
  content?: PortableTextBlock[];
  gallery?: string[];
  videoUrl?: string;
  aiSummary?: string;
  aiKeywords?: string[];
  language?: string;
  views?: number;
  likes?: number;
  tags?: Tag[];
  relatedArticles?: ArticleCard[];
  seo?: SeoData;
  socialMedia?: SocialDistributionData;
}
