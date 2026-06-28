import { defineField, defineType } from 'sanity';
import { SocialToolkit } from '../../components/SocialToolkit';
import { PublishingChecklist } from '../../components/PublishingChecklist';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'socialDistribution', title: 'Social Distribution' },
    { name: 'publishing', title: 'Publishing' },
    { name: 'stats', title: 'Statistics' },
  ],
  fields: [
    // --- Publishing Checklist ---
    defineField({
      name: 'publishingChecklist',
      title: 'Publishing Checklist',
      type: 'string',
      group: 'publishing',
      components: {
        field: PublishingChecklist
      }
    }),

    // --- Basic Information ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().min(10).max(100).warning('Title should be between 10 and 100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (Rule) => Rule.max(300).warning('Keep excerpts under 300 characters.'),
    }),

    // --- Content ---
    defineField({
      name: 'content',
      title: 'Rich Content',
      type: 'richContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'content',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'content',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary (Optional)',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'aiKeywords',
      title: 'AI Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
    }),

    // --- Social Distribution ---
    defineField({
      name: 'socialToolkit',
      title: 'Social Toolkit',
      type: 'string',
      group: 'socialDistribution',
      components: {
        field: SocialToolkit
      }
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Captions & Setup',
      type: 'socialMedia',
      group: 'socialDistribution',
    }),

    // --- Publishing & Status ---
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      group: 'publishing',
    }),
    defineField({
      name: 'publishDate',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      group: 'publishing',
    }),
    defineField({
      name: 'updatedDate',
      title: 'Updated Date',
      type: 'datetime',
      group: 'publishing',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'publishing',
    }),
    defineField({
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
      initialValue: false,
      group: 'publishing',
    }),
    defineField({
      name: 'breakingNews',
      title: 'Breaking News',
      type: 'boolean',
      initialValue: false,
      group: 'publishing',
    }),
    defineField({
      name: 'editorsPick',
      title: "Editor's Pick",
      type: 'boolean',
      initialValue: false,
      group: 'publishing',
    }),

    // --- Relationships (Moved to stats/system) ---
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'stats',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles (Override)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      group: 'stats',
    }),

    // --- Statistics ---
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      group: 'stats',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      group: 'stats',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'featuredImage',
      category: 'category.name',
    },
    prepare({ title, subtitle, media, category }) {
      return {
        title,
        subtitle: subtitle || (category ? `Category: ${category}` : ''),
        media,
      };
    },
  },
});
