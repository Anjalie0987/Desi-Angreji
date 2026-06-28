import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    { name: 'branding', title: 'Branding', options: { collapsible: true, collapsed: false } },
    { name: 'contact', title: 'Contact Information', options: { collapsible: true, collapsed: true } },
    { name: 'social', title: 'Social Links', options: { collapsible: true, collapsed: true } },
    { name: 'analytics', title: 'Analytics & Tracking', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'Default SEO', options: { collapsible: true, collapsed: true } },
    { name: 'footer', title: 'Footer Settings', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- Branding ---
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      fieldset: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      fieldset: 'branding',
    }),

    // --- Contact ---
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          { name: 'email', invert: false }
        ).warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
      fieldset: 'contact',
    }),

    // --- Social Links ---
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'YouTube', 'Other'],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
          ],
        },
      ],
    }),

    // --- Analytics ---
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      fieldset: 'analytics',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      fieldset: 'analytics',
    }),
    defineField({
      name: 'googleAdSenseId',
      title: 'Google AdSense ID',
      type: 'string',
      fieldset: 'analytics',
    }),

    // --- Default SEO ---
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      fieldset: 'seo',
    }),

    // --- Footer Settings ---
    defineField({
      name: 'footerText',
      title: 'Footer Text / Copyright',
      type: 'string',
      fieldset: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
