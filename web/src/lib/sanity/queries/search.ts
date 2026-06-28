import { groq } from 'next-sanity';
import { articleCardFragment } from '../groq';

export const searchArticlesQuery = groq`
  *[_type == "article" && status == "published" && (title match $searchQuery || excerpt match $searchQuery)] | order(publishDate desc) {
    ${articleCardFragment}
  }
`;
