import { defineField, defineType } from 'sanity';

export const youtube = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube Video URL',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({ url }) {
      return {
        title: 'YouTube Video',
        subtitle: url,
      };
    },
  },
});
