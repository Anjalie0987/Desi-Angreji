import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';

const client = createClient({
  projectId: 'vq6gtsrw',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    focusKeywords,
    canonicalUrl,
    "openGraphImage": openGraphImage.asset->url
  }
`;

const socialMediaFragment = groq`
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

const authorFragment = groq`
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

const categoryFragment = groq`
  category->{
    _id,
    name,
    "slug": slug.current,
    "coverImage": coverImage.asset->url
  }
`;

const articleCardFragment = groq`
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

const articleDetailFragment = groq`
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

const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleDetailFragment}
  }
`;

async function run() {
  try {
    const article = await client.fetch(articleBySlugQuery, { slug: 'digital-wellness' });
    console.log(JSON.stringify(article, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
