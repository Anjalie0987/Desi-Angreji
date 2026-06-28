import { defineField, defineType } from 'sanity';

export const socialMedia = defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'object',
  fields: [
    defineField({
      name: 'previewStory',
      title: 'Preview Story',
      type: 'text',
      rows: 4,
      description: 'Shortened story shown on social media before "Read More". Recommended 100-300 words.',
      validation: (Rule) => Rule.max(2000).warning('Keep it concise for social media preview.'),
    }),
    defineField({
      name: 'continueReadingCta',
      title: 'Continue Reading CTA',
      type: 'string',
      initialValue: 'Continue Reading...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shareUrl',
      title: 'Share URL',
      type: 'string',
      readOnly: true,
      description: 'Automatically generated from the article slug. Example: https://desiangrezi.com/story/article-slug',
    }),
    defineField({
      name: 'facebookCaption',
      title: 'Facebook Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramCaption',
      title: 'Instagram Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'threadsCaption',
      title: 'Threads Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whatsappCaption',
      title: 'WhatsApp Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkedinCaption',
      title: 'LinkedIn Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'xCaption',
      title: 'X (Twitter) Caption',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(280).warning('X captions should generally be under 280 characters.'),
    }),
    defineField({
      name: 'suggestedHashtags',
      title: 'Suggested Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Hashtags without the # symbol.',
    }),
    defineField({
      name: 'storyBackgroundImage',
      title: 'Story Background Image',
      type: 'image',
      description: 'Used when generating downloadable social story cards.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialThumbnail',
      title: 'Social Thumbnail',
      type: 'image',
      description: 'Used when sharing on Facebook, LinkedIn, WhatsApp, etc.',
      options: { hotspot: true },
    }),
  ],
});
