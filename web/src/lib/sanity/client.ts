import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

if (!projectId || !dataset) {
  throw new Error('Missing required Sanity environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET).');
}

/**
 * Reusable Sanity client configuration
 * useCdn: false if you want to ensure fresh data always (useful for Draft Mode),
 * or set dynamically based on environment.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
});
