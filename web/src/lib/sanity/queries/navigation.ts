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
    categoryMenu[]->{
      _id,
      name,
      "slug": slug.current,
      colorTheme
    },
    quickLinks[]{
      title,
      link
    }
  }
`;
