"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, ChevronDown, Globe, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import type { Navigation } from "@/lib/sanity";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Navigation | null;
}

export function MobileDrawer({ isOpen, onClose, navigation }: MobileDrawerProps) {
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Prevent scrolling when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = navigation?.categoryMenu || [];
  const headerLinks = (navigation?.headerMenu && navigation.headerMenu.length > 0) ? navigation.headerMenu : [
    { title: "Home", link: "/" },
    { title: "Latest", link: "/latest" },
    { title: "Trending", link: "/trending" },
    { title: "Categories", link: "/categories" },
    { title: "Videos", link: "/videos" }
  ];
  const quickLinks = navigation?.quickLinks || [];

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-4/5 max-w-sm bg-background border-l shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <span className="font-heading text-lg font-bold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {headerLinks.length > 0 && (
            <>
              <div className="px-4 pb-2 mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Menu</span>
              </div>
              <nav className="flex flex-col mb-4">
                {headerLinks.map((item, idx) => {
                  const isHome = item.link === 'home' || item.link === '/';
                  const href = item.link.startsWith('http') ? item.link : (isHome ? '/' : `/${item.link.replace(/^\//, '')}`);
                  if (item.title.toLowerCase() === 'categories') {
                    const isExpanded = openAccordion === 'categories';
                    return (
                      <div key={`m-header-${idx}`} className="flex flex-col">
                        <button
                          onClick={() => setOpenAccordion(isExpanded ? null : 'categories')}
                          className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors w-full text-left"
                          aria-expanded={isExpanded}
                        >
                          {item.title}
                          <ChevronDown className={cn("h-4 w-4 text-muted transition-transform", isExpanded && "rotate-180")} />
                        </button>
                        {isExpanded && (
                          <div className="bg-gray-50/50 border-y flex flex-col animate-in fade-in duration-200">
                            {categories.length === 0 ? (
                              <div className="px-8 py-4 text-sm text-muted-foreground">
                                No categories available.
                              </div>
                            ) : (
                              <>
                                {categories.map((cat) => {
                                  const isActive = pathname === `/category/${cat.slug}`;
                                  return (
                                    <Link 
                                      key={cat._id}
                                      href={`/category/${cat.slug}`}
                                      className={cn(
                                        "flex items-center gap-3 px-8 py-3 text-sm transition-colors",
                                        isActive ? "bg-brand/5 text-brand font-semibold" : "text-foreground hover:bg-gray-100 active:bg-gray-200"
                                      )}
                                      onClick={onClose}
                                    >
                                      {cat.name}
                                    </Link>
                                  );
                                })}
                                <Link 
                                  href="/categories" 
                                  onClick={onClose}
                                  className="px-8 py-3 text-sm font-semibold text-brand hover:text-brand/80 transition-colors"
                                >
                                  View All Categories &rarr;
                                </Link>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link 
                      key={`m-header-${idx}`}
                      href={href}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={onClose}
                    >
                      {item.title}
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </Link>
                  );
                })}
              </nav>
            </>
          )}

          <div className="mt-6 px-4 pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">More</span>
          </div>
          <nav className="flex flex-col">
            {quickLinks.map((link, idx) => (
              <Link 
                key={idx}
                href={link.link}
                className="px-4 py-3 text-sm text-foreground hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t p-4 bg-gray-50">
          <div className="flex items-center justify-center gap-4">
            <Link href="#" className="text-muted hover:text-brand transition-colors"><Globe className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted hover:text-brand transition-colors"><Globe className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted hover:text-brand transition-colors"><Globe className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted hover:text-brand transition-colors"><Globe className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
