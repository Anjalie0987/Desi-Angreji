import { sanityFetch } from '../fetch';
import { nextStoryQuery, previousStoryQuery } from '../queries/articles';
import { 
  getArticleBySlug, 
  getRelatedArticles,
  getTrendingArticles,
  getLatestArticles
} from './article.service';
import type { ArticleCard } from '../types/article';

export const getStoryBySlug = getArticleBySlug;
export const getRelatedStories = getRelatedArticles;
export const getTrendingStories = getTrendingArticles;
export const getLatestStories = getLatestArticles;

/**
 * Fetches the next published story chronologically
 */
export async function getNextStory(publishDate: string): Promise<ArticleCard | null> {
  return sanityFetch<ArticleCard | null>({
    query: nextStoryQuery,
    params: { publishDate },
    tags: ['article'],
  });
}

/**
 * Fetches the previous published story chronologically
 */
export async function getPreviousStory(publishDate: string): Promise<ArticleCard | null> {
  return sanityFetch<ArticleCard | null>({
    query: previousStoryQuery,
    params: { publishDate },
    tags: ['article'],
  });
}
