export interface NavItem {
  title: string;
  link: string;
}

export interface CategoryNavItem {
  _id: string;
  name: string;
  slug: string;
  coverImage?: string;
}

export interface Navigation {
  headerMenu?: NavItem[];
  footerMenu?: NavItem[];
  categoryMenu?: CategoryNavItem[];
  quickLinks?: NavItem[];
}
