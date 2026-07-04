import { defineField, defineType } from 'sanity';

export const importHistory = defineType({
  name: 'importHistory',
  title: 'Import History',
  type: 'document',
  readOnly: true, // Import history should never be manually edited
  groups: [
    { name: 'general', title: 'General Information' },
    { name: 'stats', title: 'Import Statistics' },
    { name: 'timeline', title: 'Activity Timeline' },
    { name: 'errors', title: 'Error Log' },
  ],
  fields: [
    // General
    defineField({ name: 'fileName', title: 'File Name', type: 'string', group: 'general' }),
    defineField({ name: 'fileType', title: 'File Type', type: 'string', group: 'general' }),
    defineField({ name: 'importedBy', title: 'Imported By', type: 'string', group: 'general' }),
    defineField({ name: 'importDate', title: 'Import Date', type: 'datetime', group: 'general' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'general',
      options: { list: ['Success', 'Partial Success', 'Failed'] }
    }),
    defineField({ name: 'publishingMode', title: 'Publishing Mode', type: 'string', group: 'general' }),
    defineField({ name: 'importDuration', title: 'Import Duration (ms)', type: 'number', group: 'general' }),

    // Stats
    defineField({ name: 'totalRows', title: 'Total Rows', type: 'number', group: 'stats' }),
    defineField({ name: 'importedSuccessfully', title: 'Imported Successfully', type: 'number', group: 'stats' }),
    defineField({ name: 'failed', title: 'Failed', type: 'number', group: 'stats' }),
    defineField({ name: 'skipped', title: 'Skipped', type: 'number', group: 'stats' }),
    defineField({ name: 'duplicateStories', title: 'Duplicate Stories', type: 'number', group: 'stats' }),

    // Timeline
    defineField({
      name: 'timeline',
      title: 'Activity Timeline',
      type: 'array',
      group: 'timeline',
      of: [
        defineField({
          name: 'event',
          type: 'object',
          fields: [
            defineField({ name: 'time', type: 'datetime', title: 'Time' }),
            defineField({ name: 'description', type: 'string', title: 'Event' }),
          ],
          preview: {
            select: { title: 'description', subtitle: 'time' },
          }
        })
      ]
    }),

    // Errors
    defineField({
      name: 'errorLog',
      title: 'Error Log',
      type: 'array',
      group: 'errors',
      of: [
        defineField({
          name: 'errorRecord',
          type: 'object',
          fields: [
            defineField({ name: 'row', type: 'number', title: 'Row Number' }),
            defineField({ name: 'title', type: 'string', title: 'Story Title' }),
            defineField({ name: 'reason', type: 'string', title: 'Reason' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'reason', row: 'row' },
            prepare({ title, subtitle, row }) {
              return { title: `Row ${row}: ${title}`, subtitle };
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'fileName',
      status: 'status',
      imported: 'importedSuccessfully',
      date: 'importDate',
    },
    prepare({ title, status, imported, date }) {
      return {
        title: title,
        subtitle: `${status} - ${imported} stories (${new Date(date).toLocaleString()})`,
      };
    }
  }
});
