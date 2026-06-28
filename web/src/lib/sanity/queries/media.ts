import { groq } from 'next-sanity';

export const allMediaQuery = groq`
  *[_type == "mediaAsset"] | order(_createdAt desc) {
    _id,
    title,
    altText,
    description,
    type,
    "imageFile": imageFile.asset->url,
    videoUrl
  }
`;
