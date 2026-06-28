import { sanityFetch } from '../fetch';
import { allAuthorsQuery, authorBySlugQuery } from '../queries/authors';
import type { Author } from '../types/author';

/**
 * Fetches all active authors.
 * @returns Array of Author
 */
export async function getAllAuthors(): Promise<Author[]> {
  return sanityFetch<Author[]>({
    query: allAuthorsQuery,
    tags: ['author'],
  });
}

/**
 * Fetches a single author by slug.
 * @param slug - The author slug
 * @returns Author or null if not found
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return sanityFetch<Author | null>({
    query: authorBySlugQuery,
    params: { slug },
    tags: ['author', `author:${slug}`],
  });
}
