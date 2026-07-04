import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fieldsets: [
    {
      name: 'basicInformation',
      title: 'Basic Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'displaySettings',
      title: 'Display Settings',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // --- Basic Information ---
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      fieldset: 'basicInformation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'basicInformation',
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
      fieldset: 'basicInformation',
      rows: 3,
    }),

    // --- Display Settings ---
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      fieldset: 'displaySettings',
      options: { hotspot: true },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      fieldset: 'displaySettings',
      initialValue: true,
      description: 'If disabled, the category should not be shown anywhere on the frontend.',
    }),
    defineField({
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      fieldset: 'displaySettings',
      initialValue: false,
    }),
    defineField({
      name: 'navigationOrder',
      title: 'Navigation Order',
      type: 'number',
      fieldset: 'displaySettings',
      hidden: ({ document }) => !document?.showInNavigation,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.showInNavigation && value === undefined) {
            return 'Navigation Order is required when Show in Navigation is enabled.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      fieldset: 'displaySettings',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      fieldset: 'displaySettings',
      initialValue: false,
    }),

    // --- SEO Settings ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'categorySeo',
      fieldset: 'seoSettings',
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
