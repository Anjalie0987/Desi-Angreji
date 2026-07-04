import type { Metadata } from "next";
import { Inter, Poppins, Noto_Sans_Devanagari } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreakingNewsWrapper } from "@/components/layout/breaking-news-wrapper";
import { NavbarSkeleton, FooterSkeleton, TickerSkeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ads";
import { getTopBannerAd } from "@/lib/ads";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { AdSenseProvider } from "@/components/providers/adsense-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: {
    default: "Desi Angreji | Modern Content & Stories",
    template: "%s | Desi Angreji",
  },
  description: "Modern content publishing platform. Premium destination for breaking news, engaging stories, and insightful articles.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

// JSON-LD structured data for the organization and website
const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
        name: "Desi Angreji",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
        url: process.env.NEXT_PUBLIC_SITE_URL,
        name: "Desi Angreji",
        publisher: {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBannerAd = await getTopBannerAd();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        
        {/* Top Banner Advertisement */}
        {topBannerAd && (
          <div className="bg-gray-50 py-2 hidden sm:block">
            <AdvertisementBanner ad={topBannerAd} />
          </div>
        )}

        {/* Sticky Header & Breaking News */}
        <div className="sticky top-0 z-50 bg-background flex flex-col">
          <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<TickerSkeleton />}>
            <BreakingNewsWrapper />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
        
        <AnalyticsProvider />
        <AdSenseProvider />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

