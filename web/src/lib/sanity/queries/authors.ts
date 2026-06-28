import { groq } from 'next-sanity';
import { seoFragment } from '../groq';

export const allAuthorsQuery = groq`
  *[_type == "author" && active == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "photo": photo.asset->url,
    designation
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "photo": photo.asset->url,
    designation,
    bio,
    email,
    website,
    socialProfiles,
    ${seoFragment}
  }
`;
