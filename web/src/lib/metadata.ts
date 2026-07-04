import { Metadata } from 'next';

/**
 * Metadata utilities placeholder
 * Helper function to generate default or page-specific Next.js metadata
 */

export function constructMetadata(): Metadata {
  return {
    title: {
      default: 'Desi Angreji',
      template: '%s | Desi Angreji',
    },
    description: 'A modern content publishing platform.',
    // Add additional base metadata here
  };
}
