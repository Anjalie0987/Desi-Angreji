import { defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fieldsets: [
    { name: 'header', title: 'Header Menu', options: { collapsible: true, collapsed: false } },
    { name: 'footer', title: 'Footer Menu', options: { collapsible: true, collapsed: true } },
    { name: 'quickLinks', title: 'Quick Links', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'headerMenu',
      title: 'Header Menu',
      type: 'array',
      fieldset: 'header',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'link', title: 'Link (URL or Path)', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      fieldset: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'link', title: 'Link (URL or Path)', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      fieldset: 'quickLinks',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'link', title: 'Link (URL or Path)', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
      };
    },
  },
});
