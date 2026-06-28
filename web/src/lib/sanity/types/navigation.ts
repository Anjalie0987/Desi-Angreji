export interface NavItem {
  title: string;
  link: string;
}

export interface CategoryNavItem {
  _id: string;
  name: string;
  slug: string;
  colorTheme?: string;
}

export interface Navigation {
  headerMenu?: NavItem[];
  footerMenu?: NavItem[];
  categoryMenu?: CategoryNavItem[];
  quickLinks?: NavItem[];
}
