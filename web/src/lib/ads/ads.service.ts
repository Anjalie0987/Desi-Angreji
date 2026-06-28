import type { Advertisement } from './types';

// In the future, these could accept query params or page context
// and fetch from Google Ad Manager or Sanity.
// For now, they return null to collapse empty spaces.

export async function getTopBannerAd(): Promise<Advertisement | null> {
  return null;
}

export async function getInlineAd(): Promise<Advertisement | null> {
  return null;
}

export async function getSidebarAd(): Promise<Advertisement | null> {
  return null;
}

export async function getArticleMiddleAd(): Promise<Advertisement | null> {
  return null;
}

export async function getArticleBottomAd(): Promise<Advertisement | null> {
  return null;
}

export async function getStickyMobileAd(): Promise<Advertisement | null> {
  return null;
}
