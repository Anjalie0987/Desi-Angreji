import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Helper to generate optimized Sanity Image URLs.
 * Usage: urlForImage(source).width(800).url()
 * 
 * @param source - The image object from Sanity
 * @returns The imageUrlBuilder instance for further configuration
 */
export const urlForImage = (source: any) => {
  return builder.image(source);
};

