"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, ChevronDown, Globe } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 left-0 w-[85%] max-w-[360px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-r-[20px] animate-in slide-in-from-left duration-300 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <span className="font-heading text-2xl font-semibold text-gray-900">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          {headerLinks.length > 0 && (
            <>
              <div className="px-2 mb-3">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">Menu</span>
              </div>
              <nav className="flex flex-col gap-1.5 mb-8">
                {headerLinks.map((item, idx) => {
                  const isHome = item.link === 'home' || item.link === '/';
                  const href = item.link.startsWith('http') ? item.link : (isHome ? '/' : `/${item.link.replace(/^\//, '')}`);
                  const isItemActive = pathname === href || (pathname === '/' && isHome);
                  
                  if (item.title.toLowerCase() === 'categories') {
                    const isExpanded = openAccordion === 'categories';
                    return (
                      <div key={`m-header-${idx}`} className="flex flex-col">
                        <button
                          onClick={() => setOpenAccordion(isExpanded ? null : 'categories')}
                          className="flex h-[54px] items-center justify-between px-5 text-[16px] font-medium rounded-xl hover:bg-[#F3E8FF] active:bg-[#E9D5FF] transition-all group w-full text-left text-gray-900"
                          aria-expanded={isExpanded}
                        >
                          <span className="group-hover:scale-[1.01] transition-transform">{item.title}</span>
                          <ChevronDown className={cn("h-5 w-5 text-gray-400 group-hover:text-brand transition-transform duration-300", isExpanded && "rotate-180")} />
                        </button>
                        
                        {/* Accordion Content */}
                        <div 
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            isExpanded ? "max-h-[1000px] opacity-100 mt-2 mb-2" : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="flex flex-col gap-1 ml-4 border-l-2 border-brand/20 pl-2">
                            {categories.length === 0 ? (
                              <div className="px-4 py-3 text-sm text-gray-500">
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
                                        "flex h-12 items-center px-4 text-[15px] font-medium rounded-lg transition-colors",
                                        isActive ? "bg-brand/10 text-brand font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                                  className="flex h-12 items-center px-4 text-[15px] font-semibold text-brand hover:bg-brand/5 rounded-lg transition-colors mt-1"
                                >
                                  View All Categories &rarr;
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const activeClass = isItemActive
                    ? "bg-[#F3E8FF] text-brand border-l-4 border-brand" 
                    : "text-gray-900 hover:bg-[#F3E8FF] active:bg-[#E9D5FF] border-l-4 border-transparent";

                  return (
                    <Link 
                      key={`m-header-${idx}`}
                      href={href}
                      className={cn(
                        "flex h-[54px] items-center justify-between px-5 text-[16px] font-medium rounded-xl transition-all group",
                        activeClass
                      )}
                      onClick={onClose}
                    >
                      <span className="group-hover:scale-[1.01] transition-transform">{item.title}</span>
                      <ChevronRight className={cn("h-5 w-5 group-hover:text-brand transition-colors", isItemActive ? "text-brand" : "text-gray-400")} />
                    </Link>
                  );
                })}
              </nav>
            </>
          )}

          {quickLinks.length > 0 && (
            <>
              <div className="px-2 mb-3 mt-4">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">More</span>
              </div>
              <nav className="flex flex-col gap-1.5">
                {quickLinks.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.link}
                    className="flex h-[50px] items-center px-5 text-[15px] font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Footer Redesign */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-6 pb-8 mt-auto">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">Follow Us</span>
            <div className="flex items-center justify-center gap-4 mb-6">
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#F3E8FF] hover:text-brand hover:border-brand/30 transition-all shadow-sm group" aria-label="Website">
                <Globe className="h-[22px] w-[22px] group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#F3E8FF] hover:text-brand hover:border-brand/30 transition-all shadow-sm group" aria-label="Facebook">
                <FaFacebook className="h-[22px] w-[22px] group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#F3E8FF] hover:text-brand hover:border-brand/30 transition-all shadow-sm group" aria-label="Instagram">
                <FaInstagram className="h-[22px] w-[22px] group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#F3E8FF] hover:text-brand hover:border-brand/30 transition-all shadow-sm group" aria-label="Twitter">
                <FaXTwitter className="h-[22px] w-[22px] group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <p className="text-xs text-gray-400">© 2026 Desi Angreji</p>
          </div>
        </div>
      </div>
    </div>
  );
}
