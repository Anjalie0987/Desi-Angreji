import { groq } from 'next-sanity';

/**
 * Reusable GROQ fragments to prevent repeating query structures across different files.
 */

export const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    focusKeywords,
    canonicalUrl,
    "openGraphImage": openGraphImage.asset->url
  }
`;

export const socialMediaFragment = groq`
  socialMedia {
    previewStory,
    continueReadingCta,
    shareUrl,
    facebookCaption,
    instagramCaption,
    threadsCaption,
    whatsappCaption,
    linkedinCaption,
    xCaption,
    suggestedHashtags,
    "storyBackgroundImage": storyBackgroundImage.asset->url,
    "socialThumbnail": socialThumbnail.asset->url
  }
`;

export const authorFragment = groq`
  author->{
    _id,
    name,
    "slug": slug.current,
    "photo": photo.asset->url,
    designation,
    bio,
    email,
    website,
    socialProfiles
  }
`;

export const categoryFragment = groq`
  category->{
    _id,
    name,
    "slug": slug.current,
    "coverImage": coverImage.asset->url,
    icon,
    colorTheme
  }
`;

export const articleCardFragment = groq`
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  "featuredImageLqip": featuredImage.asset->metadata.lqip,
  videoUrl,
  publishDate,
  updatedDate,
  status,
  featured,
  trending,
  breakingNews,
  editorsPick,
  estimatedReadingTime,
  ${categoryFragment},
  ${authorFragment}
`;

export const articleDetailFragment = groq`
  ${articleCardFragment},
  content,
  "gallery": gallery[].asset->url,
  videoUrl,
  aiSummary,
  aiKeywords,
  language,
  views,
  likes,
  tags[]->{
    name,
    "slug": slug.current
  },
  relatedArticles[]->{
    ${articleCardFragment}
  },
  ${seoFragment},
  ${socialMediaFragment}
`;
