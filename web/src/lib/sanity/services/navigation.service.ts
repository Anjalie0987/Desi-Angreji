import { sanityFetch } from '../fetch';
import { navigationQuery } from '../queries/navigation';
import type { Navigation } from '../types/navigation';

/**
 * Fetches the global navigation settings (Header, Footer, Categories).
 * @returns Navigation object or null if not configured
 */
export async function getNavigation(): Promise<Navigation | null> {
  return sanityFetch<Navigation | null>({
    query: navigationQuery,
    tags: ['navigation', 'category'],
    revalidate: 3600,
  });
}
