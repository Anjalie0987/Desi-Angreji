import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { PreviewAction } from './actions/PreviewAction'
import { CopyUrlAction } from './actions/CopyUrlAction'

export default defineConfig({
  name: 'default',
  title: 'Desi Angrezi',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Only add these actions for the 'article' document type
      if (context.schemaType === 'article') {
        return [...prev, PreviewAction, CopyUrlAction]
      }
      return prev
    },
  },
})
