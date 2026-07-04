import { defineField, defineType } from 'sanity';
import { CategorySeoInput } from '../../components/seo/CategorySeoInput';

export const categorySeo = defineType({
  name: 'categorySeo',
  title: 'Category SEO Settings',
  type: 'object',
  components: {
    input: CategorySeoInput,
  },
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
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image used when sharing this category on social media.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
