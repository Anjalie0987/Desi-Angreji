import { Suspense } from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity";
import { AdvertisementBanner } from "@/components/ads";
import { getInlineAd, getArticleBottomAd } from "@/lib/ads";
import { Skeleton, NavbarSkeleton, TickerSkeleton } from "@/components/ui/skeleton";
import {
  HeroSection,
  TrendingSection,
  LatestSection,
  CategorySection,
  VideoSection,
  EditorsSection,
  PopularSection,
  LoadMoreSection
} from "@/components/home";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  if (!settings) {
    return {
      title: "Desi Angrezi | Modern Content Platform",
      description: "Your premium destination for modern content, breaking news, and engaging stories.",
    };
  }

  const title = settings.defaultSeo?.metaTitle || settings.siteName;
  const description = settings.defaultSeo?.metaDescription || "Modern content publishing platform";
  
  return {
    title,
    description,
    keywords: settings.defaultSeo?.focusKeywords,
    alternates: {
      canonical: settings.defaultSeo?.canonicalUrl || "https://desiangrezi.com",
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: settings.siteName,
      images: settings.defaultSeo?.openGraphImage ? [
        {
          url: settings.defaultSeo.openGraphImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: settings.defaultSeo?.openGraphImage ? [settings.defaultSeo.openGraphImage] : [],
    },
  };
}

// Fallback Skeletons for independent streaming
function HeroSkeleton() {
  return (
    <div className="py-4 md:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <Skeleton className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9] rounded-xl" />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="w-full aspect-[4/3] rounded-xl" />
        <Skeleton className="w-full aspect-[4/3] rounded-xl" />
        <Skeleton className="w-full aspect-[4/3] rounded-xl hidden lg:block" />
      </div>
    </div>
  );
}

export default async function Home() {
  const inlineAd1 = await getInlineAd();
  const inlineAd2 = await getInlineAd();
  const bottomAd = await getArticleBottomAd();

  return (
    <div className="flex flex-col w-full">
      {/* 
        JSON-LD Organization Data 
        Ideally fetched dynamically, injected here for SEO
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Desi Angrezi",
            url: "https://desiangrezi.com",
            logo: "https://desiangrezi.com/logo.png"
          })
        }}
      />

      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <TrendingSection />
      </Suspense>

      {inlineAd1 && (
        <div className="py-4 bg-gray-50 flex justify-center">
          <AdvertisementBanner ad={inlineAd1} />
        </div>
      )}

      <Suspense fallback={<GridSkeleton />}>
        <LatestSection />
      </Suspense>

      <Suspense fallback={null}>
        <CategorySection />
      </Suspense>

      {inlineAd2 && (
        <div className="py-4 bg-gray-50 flex justify-center">
          <AdvertisementBanner ad={inlineAd2} />
        </div>
      )}

      <Suspense fallback={null}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={null}>
        <EditorsSection />
      </Suspense>

      <Suspense fallback={null}>
        <PopularSection />
      </Suspense>

      <LoadMoreSection />
      
      {bottomAd && (
        <div className="py-8 flex justify-center">
          <AdvertisementBanner ad={bottomAd} />
        </div>
      )}
    </div>
  );
}
