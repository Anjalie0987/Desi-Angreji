import { groq } from 'next-sanity';
import { articleCardFragment, articleDetailFragment } from '../groq';

export const latestArticlesQuery = groq`
  *[_type == "article" && status == "published"] | order(publishDate desc, _createdAt desc)[0...$limit] {
    ${articleCardFragment}
  }
`;

export const featuredArticlesQuery = groq`
  *[_type == "article" && status == "published" && featured == true] | order(publishDate desc, _createdAt desc)[0...$limit] {
    ${articleCardFragment}
  }
`;

export const trendingArticlesQuery = groq`
  *[_type == "article" && status == "published" && trending == true] | order(publishDate desc, _createdAt desc)[0...$limit] {
    ${articleCardFragment}
  }
`;

export const breakingNewsQuery = groq`
  *[_type == "article" && status == "published" && breakingNews == true] | order(publishDate desc, _createdAt desc)[0...$limit] {
    ${articleCardFragment}
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleDetailFragment}
  }
`;

export const relatedArticlesQuery = groq`
  *[_type == "article" && status == "published" && _id != $currentId && category._ref == $categoryId] | order(publishDate desc)[0...$limit] {
    ${articleCardFragment}
  }
`;

export const nextStoryQuery = groq`
  *[_type == "article" && status == "published" && publishDate < $publishDate] | order(publishDate desc)[0] {
    ${articleCardFragment}
  }
`;

export const previousStoryQuery = groq`
  *[_type == "article" && status == "published" && publishDate > $publishDate] | order(publishDate asc)[0] {
    ${articleCardFragment}
  }
`;
