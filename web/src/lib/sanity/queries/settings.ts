import { groq } from 'next-sanity';
import { seoFragment } from '../groq';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    "logo": logo.asset->url,
    "favicon": favicon.asset->url,
    contactEmail,
    contactNumber,
    socialLinks,
    googleAnalyticsId,
    googleTagManagerId,
    googleAdSenseId,
    footerText,
    ${seoFragment}
  }
`;
