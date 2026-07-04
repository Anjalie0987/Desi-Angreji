import { groq } from 'next-sanity';
import { categoryFragment, seoFragment } from '../groq';

export const allCategoriesQuery = groq`
  *[_type == "category" && active == true] | order(navigationOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    showInNavigation,
    showOnHomepage,
    featured
  }
`;

export const featuredCategoriesQuery = groq`
  *[_type == "category" && active == true && featured == true] | order(navigationOrder asc, name asc)[0...$limit] {
    _id,
    name,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && active == true && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    ${seoFragment}
  }
`;

export const articlesByCategoryQuery = groq`
  *[_type == "article" && status == "published" && category->slug.current == $slug] | order(publishDate desc, _createdAt desc)[$offset...$limit] {
    // using raw fields because we can't easily interpolate from another file cleanly if there are nested issues,
    // but assuming standard fragment works:
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    publishDate,
    status,
    ${categoryFragment}
  }
`;

export const relatedCategoriesQuery = groq`
  *[_type == "category" && active == true && slug.current != $currentSlug] | order(navigationOrder asc, name asc)[0...$limit] {
    _id,
    name,
    "slug": slug.current,
    "coverImage": coverImage.asset->url
  }
`;

export const trendingInCategoryQuery = groq`
  *[_type == "article" && status == "published" && category->slug.current == $slug && trending == true] | order(publishDate desc)[0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    publishDate,
    status,
    ${categoryFragment}
  }
`;
