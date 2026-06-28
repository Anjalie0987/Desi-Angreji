import { seo } from './objects/seo';
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

import { siteSettings } from './singleton/siteSettings';
import { navigation } from './singleton/navigation';

export const schemaTypes = [
  // Objects
  seo,
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

  // Singletons
  siteSettings,
  navigation,
];
