import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select a parent category if this is a subcategory.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon class or name (e.g., from an icon library).',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Color Theme',
      type: 'string',
      description: 'Hex code or CSS color for this category.',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false })
          .warning('Should be a valid hex color code (e.g., #FF0000)'),
    }),
    defineField({
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `/${subtitle}`,
        media,
      };
    },
  },
});
