import { sanityFetch } from '../fetch';
import {
  latestArticlesQuery,
  featuredArticlesQuery,
  trendingArticlesQuery,
  breakingNewsQuery,
  articleBySlugQuery,
  relatedArticlesQuery,
} from '../queries/articles';
import type { ArticleCard, ArticleDetail } from '../types/article';

/**
 * Fetches the latest published articles.
 * @param limit - Number of articles to fetch (default: 10)
 * @returns Array of ArticleCard
 */
export async function getLatestArticles(limit: number = 10): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: latestArticlesQuery,
    params: { limit },
    tags: ['article'],
  });
}

/**
 * Fetches featured articles.
 * @param limit - Number of articles to fetch (default: 5)
 * @returns Array of ArticleCard
 */
export async function getFeaturedArticles(limit: number = 5): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: featuredArticlesQuery,
    params: { limit },
    tags: ['article'],
  });
}

/**
 * Fetches trending articles.
 * @param limit - Number of articles to fetch (default: 5)
 * @returns Array of ArticleCard
 */
export async function getTrendingArticles(limit: number = 5): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: trendingArticlesQuery,
    params: { limit },
    tags: ['article'],
  });
}

/**
 * Fetches breaking news articles.
 * @param limit - Number of articles to fetch (default: 5)
 * @returns Array of ArticleCard
 */
export async function getBreakingNews(limit: number = 5): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: breakingNewsQuery,
    params: { limit },
    tags: ['article'],
  });
}

/**
 * Fetches a single article detail by slug.
 * @param slug - The article slug
 * @returns ArticleDetail or null if not found
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return sanityFetch<ArticleDetail | null>({
    query: articleBySlugQuery,
    params: { slug },
    tags: ['article', `article:${slug}`],
  });
}

/**
 * Fetches related articles by category, excluding the current article.
 * @param categoryId - The category document ID
 * @param currentId - The current article document ID
 * @param limit - Number of articles to fetch (default: 3)
 * @returns Array of ArticleCard
 */
export async function getRelatedArticles(
  categoryId: string,
  currentId: string,
  limit: number = 3
): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: relatedArticlesQuery,
    params: { categoryId, currentId, limit },
    tags: ['article'],
  });
}
