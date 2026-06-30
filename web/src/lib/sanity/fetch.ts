import { client } from './client';
import type { QueryParams } from 'next-sanity';

export interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Standardized fetcher wrapper over the Sanity client for Next.js App Router.
 * Handles tags, revalidation parameters, and caching gracefully.
 * 
 * @param query - The GROQ query string
 * @param params - Query parameters (e.g., { slug: 'my-slug' })
 * @param tags - Next.js cache tags for ISR on-demand revalidation
 * @param revalidate - Next.js revalidation time in seconds (default: 3600 in prod, 0 in dev)
 * @returns Strongly typed result of the query
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate,
}: SanityFetchParams): Promise<QueryResponse> {
  const isDraftMode = false; // Extend with next/headers draftMode() if needed
  
  // In development or draft mode, forcefully disable caching (0)
  // In production, use the provided revalidate time or fallback to 3600s
  const isDev = process.env.NODE_ENV === 'development' || isDraftMode;
  const finalRevalidate = isDev ? 0 : (revalidate !== undefined ? revalidate : 3600);

  if (isDev) {
    return client.fetch<QueryResponse>(query, params, { cache: 'no-store' });
  }

  return client.fetch<QueryResponse>(query, params, { next: { tags, revalidate: finalRevalidate } });
}
