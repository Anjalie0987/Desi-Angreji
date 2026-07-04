import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desiangreji.com';

  // Fetch all categories and articles
  const [categories, articles] = await Promise.all([
    sanityFetch<{ slug: { current: string }; _updatedAt: string }[]>({
      query: `*[_type == "category" && active == true]{ slug, _updatedAt }`,
      tags: ['category']
    }),
    sanityFetch<{ slug: { current: string }; _updatedAt: string }[]>({
      query: `*[_type == "article" && status == "published"]{ slug, _updatedAt }`,
      tags: ['article']
    })
  ]);

  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/cookies',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug?.current}`,
    lastModified: category._updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/story/${article.slug?.current}`,
    lastModified: article._updatedAt,
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes, ...articleRoutes];
}
