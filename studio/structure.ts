import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Editorial Dashboard')
    .items([
      // Stories
      S.listItem()
        .title('📝 Stories')
        .child(S.documentTypeList('article').title('Stories')),

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
