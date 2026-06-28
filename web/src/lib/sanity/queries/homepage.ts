import { groq } from 'next-sanity';
import { articleCardFragment } from '../groq';

export const homepageHeroQuery = groq`
  *[_type == "article" && status == "published" && featured == true] | order(publishDate desc)[0] {
    ${articleCardFragment}
  }
`;

export const homepageTrendingQuery = groq`
  *[_type == "article" && status == "published" && trending == true] | order(publishDate desc)[0...6] {
    ${articleCardFragment}
  }
`;

export const homepageLatestQuery = groq`
  *[_type == "article" && status == "published"] | order(publishDate desc)[0...6] {
    ${articleCardFragment}
  }
`;

export const homepageCategoriesQuery = groq`
  *[_type == "category" && active == true && showOnHomepage == true] | order(displayOrder asc)[0...4] {
    _id,
    name,
    "slug": slug.current,
    "coverImage": coverImage.asset->url,
    icon,
    colorTheme,
    "articles": *[_type == "article" && status == "published" && references(^._id)] | order(publishDate desc)[0...4] {
      ${articleCardFragment}
    }
  }
`;

export const homepageVideosQuery = groq`
  *[_type == "article" && status == "published" && defined(videoUrl)] | order(publishDate desc)[0...4] {
    ${articleCardFragment}
  }
`;

export const homepageEditorsPicksQuery = groq`
  *[_type == "article" && status == "published" && editorsPick == true] | order(publishDate desc)[0...6] {
    ${articleCardFragment}
  }
`;

// Popular stories fallback: Editor's Pick DESC -> Trending DESC -> Featured DESC -> Latest Published
export const homepagePopularQuery = groq`
  *[_type == "article" && status == "published"] | order(editorsPick desc, trending desc, featured desc, publishDate desc)[0...5] {
    ${articleCardFragment}
  }
`;
