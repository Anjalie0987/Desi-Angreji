export type AdvertisementPlacement = 
  | "top-banner"
  | "inline"
  | "sidebar"
  | "article-middle"
  | "article-bottom"
  | "sticky-mobile";

export interface Advertisement {
  id: string;
  title: string;
  image: string;
  targetUrl: string;
  placement: AdvertisementPlacement;
  active: boolean;
  startDate?: string;
  endDate?: string;
}
