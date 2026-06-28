import { sanityFetch } from '../fetch';
import * as queries from '../queries/homepage';
import type { ArticleCard } from '../types/article';
import type { Category } from '../types/category';

export interface CategoryWithArticles extends Category {
  articles: ArticleCard[];
}

export async function getHomepageHero(): Promise<ArticleCard | null> {
  return sanityFetch<ArticleCard | null>({
    query: queries.homepageHeroQuery,
    tags: ['article'],
    revalidate: 60,
  });
}

export async function getHomepageTrending(): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: queries.homepageTrendingQuery,
    tags: ['article'],
    revalidate: 60,
  });
}

export async function getHomepageLatest(): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: queries.homepageLatestQuery,
    tags: ['article'],
    revalidate: 60,
  });
}

export async function getHomepageCategories(): Promise<CategoryWithArticles[]> {
  return sanityFetch<CategoryWithArticles[]>({
    query: queries.homepageCategoriesQuery,
    tags: ['article', 'category'],
    revalidate: 300, // Cache for 5 minutes
  });
}

export async function getHomepageVideos(): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: queries.homepageVideosQuery,
    tags: ['article'],
    revalidate: 60,
  });
}

export async function getHomepageEditorsPicks(): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: queries.homepageEditorsPicksQuery,
    tags: ['article'],
    revalidate: 60,
  });
}

export async function getHomepagePopular(): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: queries.homepagePopularQuery,
    tags: ['article'],
    revalidate: 60,
  });
}
