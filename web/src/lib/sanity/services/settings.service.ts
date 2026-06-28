import { sanityFetch } from '../fetch';
import { siteSettingsQuery } from '../queries/settings';
import type { SiteSettings } from '../types/settings';

/**
 * Fetches global site settings and SEO defaults.
 * @returns SiteSettings object or null if not configured
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
    revalidate: 3600,
  });
}
