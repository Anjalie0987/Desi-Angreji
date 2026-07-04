import { groq } from 'next-sanity';

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    headerMenu[]{
      title,
      link
    },
    footerMenu[]{
      title,
      link
    },
    "categoryMenu": *[_type == "category" && active == true && showInNavigation == true] | order(navigationOrder asc) {
      _id,
      name,
      "slug": slug.current,
      "coverImage": coverImage.asset->url
    },
    quickLinks[]{
      title,
      link
    }
  }
`;
