import { SanityClient } from 'sanity';
import { ValidatedRow, DuplicateResult } from '../validation/types';
import { normalizeText } from './utils';
import { generateSlug } from '../validation/utils';

export interface ExistingStory {
  _id: string;
  title: string;
  slug: string;
}

export class DuplicateService {
  private client: SanityClient;
  private existingStories: ExistingStory[] = [];
  private normalizedTitles: Set<string> = new Set();
  private slugs: Set<string> = new Set();

  constructor(client: SanityClient) {
    this.client = client;
  }

  async fetchExistingStories() {
    const stories = await this.client.fetch<ExistingStory[]>(
      `*[_type == "article"]{ _id, title, "slug": slug.current }`
    );
    this.existingStories = stories;
    
    this.normalizedTitles = new Set();
    this.slugs = new Set();
    
    stories.forEach(story => {
      if (story.slug) this.slugs.add(story.slug);
      if (story.title) this.normalizedTitles.add(normalizeText(story.title));
    });
  }

  checkDuplicates(rows: ValidatedRow[], mapping: Record<string, string>): ValidatedRow[] {
    return rows.map(row => {
      const getVal = (field: string) => {
        const col = Object.keys(mapping).find(k => mapping[k] === field);
        return col ? row.originalRow[col] : undefined;
      };

      const title = String(getVal('title') || '');
      const slugVal = getVal('slug');
      const slug = slugVal ? String(slugVal) : generateSlug(title);
      
      let duplicate: DuplicateResult = {
        status: 'new',
        reason: 'No match',
      };

      if (slug && this.slugs.has(slug)) {
        duplicate = {
          status: 'exact',
          reason: 'Slug already exists',
        };
      } else if (title && this.normalizedTitles.has(normalizeText(title))) {
        duplicate = {
          status: 'possible',
          reason: 'Same title found',
        };
      }

      return {
        ...row,
        duplicate,
      };
    });
  }
}
