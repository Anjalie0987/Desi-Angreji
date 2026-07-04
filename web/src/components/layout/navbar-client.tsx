"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { Navigation, SiteSettings, CategoryNavItem } from "@/lib/sanity";
import { SearchOverlay } from "./search-overlay";
import { MobileDrawer } from "./mobile-drawer";
import Image from "next/image";

function CategoryDropdown({ categories }: { categories: CategoryNavItem[] | undefined }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setIsOpen(false);
      }}
    >
      <button 
        className="flex items-center gap-1 text-sm font-semibold font-heading uppercase tracking-wider text-foreground hover:text-brand transition-colors"
        aria-expanded={isOpen}
      >
        Categories
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-white border shadow-md rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="p-2 flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
            {categories === undefined ? (
              // Loading State
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                  <div className="h-10 w-10 rounded bg-gray-100 shrink-0" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))
            ) : categories.length === 0 ? (
              // Empty State
              <div className="p-6 text-center text-sm text-muted-foreground">
                No categories available.
              </div>
            ) : (
              // Categories List
              categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 group/item cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/50",
                      isActive ? "bg-brand/5" : "hover:bg-gray-50"
                    )}
                  >
                    {cat.coverImage ? (
                      <div className="relative h-10 w-10 rounded overflow-hidden shrink-0 bg-gray-100">
                        <Image src={cat.coverImage} alt={cat.name} fill className="object-cover" sizes="40px" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-10 w-10 rounded bg-gray-100 shrink-0 text-muted-foreground group-hover/item:text-brand transition-colors">
                        <LayoutGrid className="h-5 w-5" />
                      </div>
                    )}
                    <span className={cn(
                      "font-heading font-semibold text-sm transition-colors duration-200",
                      isActive ? "text-brand" : "text-foreground group-hover/item:text-brand"
                    )}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
          <div className="bg-gray-50/50 border-t p-2 text-center">
            <Link 
              href="/categories" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:underline py-1"
            >
              View All Categories &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface NavbarClientProps {
  navigation: Navigation | null;
  settings?: SiteSettings | null;
}

export function NavbarClient({ navigation, settings }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = navigation?.categoryMenu || [];
  const headerLinks = (navigation?.headerMenu && navigation.headerMenu.length > 0) ? navigation.headerMenu : [
    { title: "Home", link: "/" },
    { title: "Latest", link: "/latest" },
    { title: "Trending", link: "/trending" },
    { title: "Categories", link: "/categories" },
    { title: "Videos", link: "/videos" }
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-200",
          isScrolled 
            ? "bg-background/95 backdrop-blur-sm shadow-sm py-2" 
            : "bg-background py-4"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Button suppressHydrationWarning variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            {settings?.logo ? (
              <div className="relative h-10 w-32 sm:h-12 sm:w-40 lg:h-14 lg:w-48">
                <Image 
                  src={settings.logo} 
                  alt={settings.siteName || "Desi Angreji"} 
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {settings?.siteName ? (
                  settings.siteName
                ) : (
                  <>Desi<span className="text-brand">Angrezi</span></>
                )}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {headerLinks.map((item, idx) => {
              const isHome = item.link === 'home' || item.link === '/';
              const cleanLink = item.link.replace(/^\//, '');
              let href = item.link;
              
              if (!href.startsWith('http')) {
                if (isHome) {
                  href = '/';
                } else {
                  // Automatically route simple words to /category/ unless they are specific known pages
                  const knownPages = ['about', 'contact', 'privacy', 'terms', 'latest', 'trending', 'videos', 'categories'];
                  if (!cleanLink.includes('/') && !knownPages.includes(cleanLink.toLowerCase())) {
                    href = `/category/${cleanLink}`;
                  } else {
                    href = `/${cleanLink}`;
                  }
                }
              }
              
              if (item.title.toLowerCase() === 'categories') {
                return <CategoryDropdown key={`header-${idx}`} categories={categories} />;
              }

              return (
                <Link 
                  key={`header-${idx}`}
                  href={href}
                  className="text-sm font-semibold font-heading uppercase tracking-wider text-foreground hover:text-brand transition-colors"
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Search Button */}
          <div className="flex items-center">
            <Button suppressHydrationWarning variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigation={navigation} />
    </>
  );
}
