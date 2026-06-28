import { sanityFetch } from '../fetch';
import {
  allCategoriesQuery,
  featuredCategoriesQuery,
  categoryBySlugQuery,
  articlesByCategoryQuery,
  relatedCategoriesQuery,
  trendingInCategoryQuery,
} from '../queries/categories';
import type { Category } from '../types/category';
import type { ArticleCard } from '../types/article';

/**
 * Fetches all active categories.
 * @returns Array of Category
 */
export async function getAllCategories(): Promise<Category[]> {
  return sanityFetch<Category[]>({
    query: allCategoriesQuery,
    tags: ['category'],
  });
}

/**
 * Fetches featured categories.
 * @param limit - Number of categories to fetch (default: 4)
 * @returns Array of Category
 */
export async function getFeaturedCategories(limit: number = 4): Promise<Category[]> {
  return sanityFetch<Category[]>({
    query: featuredCategoriesQuery,
    params: { limit },
    tags: ['category'],
  });
}

/**
 * Fetches a single category by slug.
 * @param slug - The category slug
 * @returns Category or null if not found
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityFetch<Category | null>({
    query: categoryBySlugQuery,
    params: { slug },
    tags: ['category', `category:${slug}`],
  });
}

/**
 * Fetches articles belonging to a specific category.
 * @param slug - The category slug
 * @param offset - Pagination offset (default: 0)
 * @param limit - Pagination limit (default: 10)
 * @returns Array of ArticleCard
 */
export async function getCategoryArticles(
  slug: string,
  offset: number = 0,
  limit: number = 10
): Promise<ArticleCard[]> {
  return sanityFetch<ArticleCard[]>({
    query: articlesByCategoryQuery,
    params: { slug, offset, limit: offset + limit },
    tags: ['article', 'category'],
  });
}

/**
 * Fetches related categories, excluding current one
 */
export async function getRelatedCategories(currentSlug: string, limit: number = 4): Promise<Category[]> {
  return sanityFetch<Category[]>({
    query: relatedCategoriesQuery,
    params: { currentSlug, limit },
    tags: ['category'],
  });
}

/**
 * Fetches the trending article in a category
 */
export async function getTrendingInCategory(slug: string): Promise<ArticleCard | null> {
  return sanityFetch<ArticleCard | null>({
    query: trendingInCategoryQuery,
    params: { slug },
    tags: ['article', 'category'],
  });
}
