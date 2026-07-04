import type { StructureResolver } from 'sanity/structure';
import BulkImportTool from './components/BulkImport';
import BulkStoryManager from './components/BulkOperations/BulkStoryManager';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Editorial Dashboard')
    .items([
      // Stories
      S.listItem()
        .title('📝 Stories')
        .child(
          S.component(BulkStoryManager)
            .title('Stories')
            .id('storiesManager')
        ),

      S.listItem()
        .title('📥 Bulk Story Import')
        .child(
          S.component(BulkImportTool)
            .title('Bulk Story Import')
            .id('bulkImport')
        ),

      S.listItem()
        .title('🕰 Import History')
        .child(
          S.documentTypeList('importHistory')
            .title('Import History')
            .defaultOrdering([{ field: 'importDate', direction: 'desc' }])
        ),

      S.divider(),

      // Classification
      S.listItem()
        .title('📂 Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('🏷 Tags')
        .child(S.documentTypeList('tag').title('Tags')),

      S.divider(),

      // People & Media
      S.listItem()
        .title('👤 Authors')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('🖼 Media Library')
        .child(S.documentTypeList('mediaAsset').title('Media Assets')),

      S.divider(),

      // Site Management
      S.listItem()
        .title('🌐 Navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('⚙ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);
