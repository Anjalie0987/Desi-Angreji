"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { Navigation, SiteSettings } from "@/lib/sanity";
import { SearchOverlay } from "./search-overlay";
import { MobileDrawer } from "./mobile-drawer";
import Image from "next/image";

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
  const headerLinks = navigation?.headerMenu || [];

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
                  alt={settings.siteName || "Desi Angrezi"} 
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
            {headerLinks.length > 0 ? (
              headerLinks.map((item, idx) => {
                const isHome = item.link === 'home' || item.link === '/';
                const cleanLink = item.link.replace(/^\//, '');
                let href = item.link;
                
                if (!href.startsWith('http')) {
                  if (isHome) {
                    href = '/';
                  } else {
                    // Automatically route simple words to /category/ unless they are specific known pages
                    const knownPages = ['about', 'contact', 'privacy', 'terms'];
                    if (!cleanLink.includes('/') && !knownPages.includes(cleanLink.toLowerCase())) {
                      href = `/category/${cleanLink}`;
                    } else {
                      href = `/${cleanLink}`;
                    }
                  }
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
              })
            ) : (
              categories.slice(0, 6).map((cat) => (
                <Link 
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className="text-sm font-semibold font-heading uppercase tracking-wider text-foreground hover:text-brand transition-colors"
                >
                  {cat.name}
                </Link>
              ))
            )}
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
