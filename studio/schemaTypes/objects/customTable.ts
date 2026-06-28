import { defineField, defineType } from 'sanity';

export const customTable = defineType({
  name: 'customTable',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'cells',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Table',
      };
    },
  },
});
