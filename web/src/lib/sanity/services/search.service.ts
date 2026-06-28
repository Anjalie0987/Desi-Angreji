import { sanityFetch } from '../fetch';
import { searchArticlesQuery } from '../queries/search';
import type { ArticleCard } from '../types/article';

/**
 * Searches for published articles matching a query string in title or excerpt.
 * @param searchQuery - The search term (wildcards allowed, e.g., 'news*')
 * @returns Array of matching ArticleCard
 */
export async function searchArticles(searchQuery: string): Promise<ArticleCard[]> {
  if (!searchQuery || searchQuery.trim() === '') {
    return [];
  }

  // Sanity GROQ match operator requires wildcards for partial matches
  // So "test" becomes "*test*"
  const formattedQuery = `*${searchQuery.trim()}*`;

  return sanityFetch<ArticleCard[]>({
    query: searchArticlesQuery,
    params: { searchQuery: formattedQuery },
    // Searches usually shouldn't be heavily cached on the server or we can cache them dynamically
    tags: ['article'],
    revalidate: 60, 
  });
}
