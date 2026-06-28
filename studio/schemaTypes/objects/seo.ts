import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and browser tabs.',
      validation: (Rule) =>
        Rule.max(60).warning(
          'Longer titles may be truncated by search engines (usually around 60 characters)'
        ),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Longer descriptions may be truncated by search engines (usually around 160 characters)'
        ),
    }),
    defineField({
      name: 'focusKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords to target for SEO.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred version of this page for search engines.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image used when sharing this page on social media.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
