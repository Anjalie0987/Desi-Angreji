import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';
import { marked } from 'marked';

// Compile a basic schema for block-tools to know what marks/styles are allowed
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      type: 'object',
      name: 'richContent',
      fields: [
        {
          name: 'content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'H5', value: 'h5' },
                { title: 'H6', value: 'h6' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Number', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Underline', value: 'underline' },
                  { title: 'Strike', value: 'strike-through' },
                  { title: 'Code', value: 'code' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url'
                      }
                    ]
                  }
                ]
              }
            },
            {
              type: 'image',
              fields: [
                { type: 'text', name: 'alt', title: 'Alt text' }
              ]
            }
          ]
        }
      ]
    }
  ]
});

const blockContentType = defaultSchema.get('richContent').fields.find((f: any) => f.name === 'content').type;

export function detectContentType(content: any): 'portabletext' | 'html' | 'markdown' | 'plaintext' | 'empty' {
  if (content === null || content === undefined) return 'empty';
  
  if (Array.isArray(content)) {
    // Check if it looks like Portable Text
    if (content.length > 0 && content[0]._type === 'block') {
      return 'portabletext';
    }
    return 'plaintext'; // If it's some other array, we'll try to convert it to plain text later
  }

  const str = String(content).trim();
  if (!str) return 'empty';

  // Check if it's stringified JSON Portable Text
  if (str.startsWith('[') && (str.includes('"_type":"block"') || str.includes('_type: "block"') || str.includes('_type: \'block\'') || str.includes('_type":"block"'))) {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]._type === 'block') {
        return 'portabletext';
      }
    } catch (e) {
      // Not valid JSON
    }
  }

  // Check for HTML tags
  if (/<[a-z][\s\S]*>/i.test(str)) {
    return 'html';
  }

  // Check for Markdown (e.g., # Heading, **bold**, - list)
  const markdownRegex = /(?:^#{1,6}\s)|(?:\*\*[^*]+\*\*)|(?:^-\s)|(?:^\*\s)|(?:^>\s)|(?:\[.+\]\(.+\))/m;
  if (markdownRegex.test(str)) {
    return 'markdown';
  }

  return 'plaintext';
}

export function cleanContent(content: string): string {
  if (!content) return '';
  return content
    .replace(/\u200B/g, '') // Remove zero-width spaces
    .replace(/[\u2018\u2019]/g, "'") // Normalize smart quotes
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\r\n/g, '\n') // Normalize CRLF
    .replace(/\n{3,}/g, '\n\n') // Normalize excessive line breaks
    .trim();
}

export function convertHtmlToPortableText(html: string): any[] {
  // Use browser's DOMParser
  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlStr) => new DOMParser().parseFromString(htmlStr, 'text/html'),
  });
  return blocks;
}

export async function convertMarkdownToPortableText(md: string): Promise<any[]> {
  const html = await marked.parse(md, { async: true });
  return convertHtmlToPortableText(html);
}

export function convertPlainTextToPortableText(text: string): any[] {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.filter(p => p.trim()).map(p => ({
    _key: crypto.randomUUID(),
    _type: 'block',
    style: 'normal',
    children: [
      {
        _key: crypto.randomUUID(),
        _type: 'span',
        marks: [],
        text: p.trim(),
      }
    ]
  }));
}

export function validatePortableText(blocks: any[]): any[] {
  if (!Array.isArray(blocks)) return [];
  
  return blocks.filter(block => {
    if (!block || typeof block !== 'object') return false;
    if (block._type !== 'block' && block._type !== 'image') return false;
    
    // Validate block children
    if (block._type === 'block') {
      if (!Array.isArray(block.children) || block.children.length === 0) return false;
      // Ensure all children are valid spans or types
      const hasValidText = block.children.some((child: any) => 
        child._type === 'span' && typeof child.text === 'string' && child.text.trim().length > 0
      );
      if (!hasValidText) return false;
    }
    
    return true;
  });
}

export async function normalizeContent(content: any): Promise<any[]> {
  const type = detectContentType(content);

  if (type === 'empty') {
    throw new Error('Content is empty');
  }

  if (type === 'portabletext') {
    let parsedContent = content;
    if (typeof content === 'string') {
      parsedContent = JSON.parse(content);
    }
    const valid = validatePortableText(parsedContent);
    if (valid.length === 0) {
      throw new Error('Content contains invalid Portable Text format');
    }
    return valid;
  }

  const strContent = cleanContent(String(content));
  let blocks: any[] = [];

  switch (type) {
    case 'html':
      blocks = convertHtmlToPortableText(strContent);
      break;
    case 'markdown':
      blocks = await convertMarkdownToPortableText(strContent);
      break;
    case 'plaintext':
    default:
      blocks = convertPlainTextToPortableText(strContent);
      break;
  }

  const validBlocks = validatePortableText(blocks);
  if (validBlocks.length === 0) {
    throw new Error('Failed to extract valid content');
  }

  // Ensure blocks have unique keys (block-tools sometimes doesn't generate them perfectly)
  return validBlocks.map(block => {
    if (!block._key) block._key = crypto.randomUUID();
    if (block.children && Array.isArray(block.children)) {
      block.children = block.children.map((child: any) => {
        if (!child._key) child._key = crypto.randomUUID();
        return child;
      });
    }
    return block;
  });
}
