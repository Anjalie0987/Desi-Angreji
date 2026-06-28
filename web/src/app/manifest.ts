import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Desi Angrezi',
    short_name: 'Desi Angrezi',
    description: 'Modern content publishing platform for the latest news and engaging stories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E11D48', // Primary brand color
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
