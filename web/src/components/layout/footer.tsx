import * as React from "react";
import Link from "next/link";
import { Globe, Mail, ChevronUp } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { getNavigation, getSiteSettings } from "@/lib/sanity";
import { Button } from "../ui/button";

export async function Footer() {
  const [navigation, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
  ]);

  const categories = navigation?.categoryMenu?.length ? navigation.categoryMenu : (navigation?.headerMenu || []);
  
  const staticQuickLinks = [
    { title: "About Us", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Privacy Policy", link: "/privacy" },
    { title: "Terms & Conditions", link: "/terms" },
    { title: "Disclaimer", link: "/disclaimer" },
    { title: "Cookie Policy", link: "/cookies" },
  ];
  
  const sanityQuickLinks = navigation?.footerMenu?.length ? navigation.footerMenu : (navigation?.quickLinks || []);
  
  // Merge links, prioritizing static links if they aren't already managed in Sanity
  const quickLinks = sanityQuickLinks.length > 0 
    ? [...sanityQuickLinks, ...staticQuickLinks.filter(s => !sanityQuickLinks.some((q: any) => q.link === s.link))]
    : staticQuickLinks;

  const socialLinks = settings?.socialLinks || [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gray-50 pt-16 pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              {settings?.logo ? (
                <div className="relative h-12 w-40 mb-2">
                  <img 
                    src={settings.logo} 
                    alt={settings.siteName || "Desi Angrezi"} 
                    className="object-contain object-left w-full h-full"
                  />
                </div>
              ) : (
                <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
                  {settings?.siteName ? settings.siteName : <>Desi<span className="text-brand">Angrezi</span></>}
                </span>
              )}
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-sm">
              {settings?.defaultSeo?.metaDescription || "Your premium destination for modern content, breaking news, and engaging stories."}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {socialLinks.map((social, idx) => {
                  const PlatformIcon = 
                    social.platform.toLowerCase() === "facebook" ? FaFacebook :
                    social.platform.toLowerCase() === "twitter" ? FaTwitter :
                    social.platform.toLowerCase() === "instagram" ? FaInstagram :
                    social.platform.toLowerCase() === "linkedin" ? FaLinkedin :
                    social.platform.toLowerCase() === "youtube" ? FaYoutube :
                    Globe;
                  return (
                    <Link 
                      key={idx}
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-muted hover:text-brand transition-colors"
                      title={social.platform}
                    >
                      <PlatformIcon className="h-5 w-5" />
                      <span className="sr-only">{social.platform}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat: any, idx) => {
                const slug = cat.slug || cat.link;
                const name = cat.name || cat.title;
                const href = slug.startsWith('http') ? slug : (slug === 'home' || slug === '/' ? '/' : `/${slug.replace(/^\//, '')}`);
                return (
                  <li key={cat._id || idx}>
                    <Link href={href} className="text-sm text-muted hover:text-brand transition-colors">
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.link} className="text-sm text-muted hover:text-brand transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-sm text-muted mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex gap-2">
              <input 
                suppressHydrationWarning
                type="email" 
                placeholder="Your email address" 
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                required
              />
              <Button suppressHydrationWarning type="submit" variant="default" size="sm">Subscribe</Button>
            </form>
            
            {settings?.contactEmail && (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand">{settings.contactEmail}</a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted text-center md:text-left">
            &copy; {currentYear} {settings?.siteName || "Desi Angrezi"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-brand">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted hover:text-brand">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
