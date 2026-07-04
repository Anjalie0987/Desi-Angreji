import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getArticleBySlug, getSiteSettings, getNextStory } from "@/lib/sanity";
import { AdvertisementBanner } from "@/components/ads";
import { getArticleMiddleAd, getSidebarAd, getArticleBottomAd } from "@/lib/ads";
import { RichText } from "@/components/portable-text";
import {
  ArticleHeader,
  ArticleMeta,
  ArticleShare,
  ArticleProgress,
  RelatedStories,
  ContinueReading,
  CommentsPlaceholder,
  SocialToolkit
} from "@/components/article";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate Dynamic SEO Metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  const settings = await getSiteSettings();

  if (!article || article.status !== "published") {
    return { title: "Story Not Found" };
  }

  const siteName = settings?.siteName || "Desi Angreji";
  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.excerpt || "";
  const url = `${settings?.defaultSeo?.canonicalUrl || "https://desiangreji.com"}/story/${article.slug}`;

  const ogImages = [];
  if (article.seo?.openGraphImage) {
    ogImages.push(article.seo.openGraphImage);
  } else if (article.featuredImage) {
    ogImages.push(article.featuredImage);
  }

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: article.seo?.focusKeywords || article.aiKeywords,
    alternates: {
      canonical: article.seo?.canonicalUrl || url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName,
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: article.author ? [article.author.name] : [],
      images: ogImages.map(imgUrl => ({ url: imgUrl })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function StoryPage(props: PageProps) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  const settings = await getSiteSettings();
  const middleAd = await getArticleMiddleAd();
  const sidebarAd = await getSidebarAd();
  const bottomAd = await getArticleBottomAd();
  const nextStory = await getNextStory(article?.publishDate || new Date().toISOString());

  if (!article || article.status !== "published") {
    notFound();
  }

  const siteUrl = settings?.defaultSeo?.canonicalUrl || "https://desiangreji.com";
  const articleUrl = `${siteUrl}/story/${article.slug}`;

  // Generate NewsArticle JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.seo?.metaTitle || article.title,
    "image": article.seo?.openGraphImage || article.featuredImage ? [article.seo?.openGraphImage || article.featuredImage] : [],
    "datePublished": article.publishDate,
    "dateModified": article.updatedDate || article.publishDate,
    "author": article.author ? [{
      "@type": "Person",
      "name": article.author.name,
      "url": article.author.website || `${siteUrl}/author/${article.author.slug}`
    }] : [],
    "publisher": {
      "@type": "Organization",
      "name": settings?.siteName || "Desi Angreji",
      "logo": {
        "@type": "ImageObject",
        "url": settings?.logo || `${siteUrl}/logo.png`
      }
    }
  };

  return (
    <article className="relative w-full flex flex-col min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <ArticleProgress />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <main className="lg:col-span-8 xl:col-span-8">
            <ArticleHeader article={article} />

            {/* Portable Text Content (Entire Story) */}
            <div className="mb-6">
              <RichText content={article.content as unknown[]} className="prose-lg" />
            </div>

            <ArticleMeta article={article} />

            {/* Featured Image */}
            {article.featuredImage && (
              <figure className="my-8 relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </figure>
            )}

            {/* Advertisement Banner */}
            {middleAd && (
              <div className="my-8 flex justify-center">
                <AdvertisementBanner ad={middleAd} />
              </div>
            )}
            
            {/* Comments */}
            <CommentsPlaceholder />
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 xl:col-start-10 hidden lg:block relative">
            <div className="sticky top-24 flex flex-col gap-12">
              <ArticleShare 
                url={articleUrl} 
                title={article.title} 
                socialData={article.socialMedia} 
              />
              {sidebarAd && <AdvertisementBanner ad={sidebarAd} />}
            </div>
          </aside>
          
        </div>

        {/* Mobile Sticky Share (Visible only on small screens) */}
        <div className="lg:hidden my-12 border-t pt-8 border-gray-100">
          <ArticleShare 
            url={articleUrl} 
            title={article.title} 
            socialData={article.socialMedia} 
          />
        </div>

      </div>

      {/* Related Stories */}
      {article.category && (
        <Suspense fallback={null}>
          <RelatedStories categoryId={article.category._id} currentId={article._id} />
        </Suspense>
      )}

      {/* Pre-Footer Ad */}
      {bottomAd && (
        <div className="py-8 bg-gray-50 flex justify-center border-t border-gray-200">
          <AdvertisementBanner ad={bottomAd} />
        </div>
      )}

      {/* Continue Reading */}
      <Suspense fallback={null}>
        <ContinueReading nextStory={nextStory} currentId={article._id} />
      </Suspense>


      {/* Social Toolkit (Dev Only) */}
      <SocialToolkit article={article} url={articleUrl} />
    </article>
  );
}
