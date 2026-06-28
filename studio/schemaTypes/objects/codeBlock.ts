import { defineField, defineType } from 'sanity';

export const codeBlock = defineType({
  name: 'codeBlock',
  type: 'object',
  title: 'Code Block',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
        ],
      },
    }),
    defineField({
      name: 'code',
      type: 'text',
      title: 'Code',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare({ language, code }) {
      return {
        title: 'Code Block',
        subtitle: language ? `Language: ${language}` : 'No language selected',
      };
    },
  },
});
