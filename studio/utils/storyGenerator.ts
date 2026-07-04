import { generateSlug } from '../components/BulkImport/validation/utils';

export interface StoryGenerationInputs {
  title: string;
  content: any[];
  categoryId?: string;
  authorId?: string;
  featuredImageId?: string;
  status: 'draft' | 'published';
  tags?: string[];
  videoUrl?: string;
}

function extractTextFromBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter(block => block._type === 'block' && Array.isArray(block.children))
    .map(block => block.children.map((child: any) => child.text || '').join(''))
    .join('\n\n');
}

function truncateString(str: string, length: number): string {
  if (!str) return '';
  const cleanStr = str.replace(/(<([^>]+)>)/gi, "").trim();
  if (cleanStr.length <= length) return cleanStr;
  return cleanStr.slice(0, length).trim() + '...';
}

function generateFocusKeywords(title: string, contentStr: string): string[] {
  const words = title.split(/\s+/).filter(w => w.length > 4);
  return words.slice(0, 3).map(w => w.toLowerCase());
}

export function buildCompleteStory(inputs: StoryGenerationInputs): any {
  const { title, content, categoryId, authorId, featuredImageId, status, videoUrl } = inputs;

  const uuid = crypto.randomUUID();
  const _id = status === 'draft' ? `drafts.${uuid}` : uuid;
  const slugStr = generateSlug(title);
  const now = new Date().toISOString();
  
  const plainTextContent = extractTextFromBlocks(content);
  const excerpt = truncateString(plainTextContent, 150);
  const canonicalUrl = `https://desiangreji.com/story/${slugStr}`;

  return {
    _id,
    _type: 'article',
    
    // Basic Info
    title,
    slug: { current: slugStr },
    excerpt,
    category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
    author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
    featuredImage: featuredImageId ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: featuredImageId }
    } : undefined,

    // Content
    content: content,
    videoUrl: videoUrl || undefined,

    // SEO
    seo: {
      _type: 'seo',
      metaTitle: `${truncateString(title, 55)} | Desi Angreji`,
      metaDescription: truncateString(plainTextContent, 155),
      focusKeywords: generateFocusKeywords(title, plainTextContent),
      canonicalUrl,
      openGraphImage: featuredImageId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredImageId }
      } : undefined,
    },

    // Social Distribution
    socialMedia: {
      _type: 'socialMedia',
      previewStory: truncateString(plainTextContent, 300),
      continueReadingCta: 'Read the full story on Desi Angreji →',
      shareUrl: canonicalUrl,
      facebookCaption: `✨ ${title}\n\n${truncateString(plainTextContent, 400)}\n\n👉 Read the full story here: ${canonicalUrl}`,
      instagramCaption: `📰 ${title}\n\n${excerpt}\n\nLink in bio! 🚀\n#DesiAngreji`,
      threadsCaption: `Just published: ${title} 👇\n${canonicalUrl}`,
      linkedinCaption: `We just published a new article: "${title}".\n\nRead the full story here: ${canonicalUrl}`,
      whatsappCaption: `*${title}*\n\n${excerpt}\n\nRead more: ${canonicalUrl}`,
      xCaption: `${truncateString(title, 200)} ${canonicalUrl}`,
      suggestedHashtags: ['DesiAngreji', ...generateFocusKeywords(title, plainTextContent)],
      storyBackgroundImage: featuredImageId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredImageId }
      } : undefined,
      socialThumbnail: featuredImageId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: featuredImageId }
      } : undefined,
    },

    // Publishing
    status,
    publishDate: now,
    updatedDate: now,
    featured: false,
    trending: false,
    breakingNews: false,
    editorsPick: false,
    
    // Statistics
    views: 0,
    likes: 0,
  };
}
