import { seo } from './objects/seo';
import { categorySeo } from './objects/categorySeo';
import { socialMedia } from './objects/socialMedia';
import { richContent } from './objects/richContent';
import { youtube } from './objects/youtube';
import { codeBlock } from './objects/codeBlock';
import { customTable } from './objects/customTable';

import { category } from './documents/category';
import { author } from './documents/author';
import { tag } from './documents/tag';
import { mediaAsset } from './documents/mediaAsset';
import { article } from './documents/article';
import { importHistory } from './documents/importHistory';

import { siteSettings } from './singleton/siteSettings';
import { navigation } from './singleton/navigation';

export const schemaTypes = [
  // Objects
  seo,
  categorySeo,
  socialMedia,
  richContent,
  youtube,
  codeBlock,
  customTable,

  // Documents
  category,
  author,
  tag,
  mediaAsset,
  article,
  importHistory,

  // Singletons
  siteSettings,
  navigation,
];
