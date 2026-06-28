import { defineField, defineType } from 'sanity';

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for SEO and accessibility. Describe the media.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description/Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageFile',
      title: 'Image File',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.type !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL or File',
      type: 'url',
      description: 'Provide a video URL (e.g., YouTube/Vimeo) or direct link to a video file.',
      hidden: ({ document }) => document?.type !== 'video',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'imageFile',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
        media,
      };
    },
  },
});
