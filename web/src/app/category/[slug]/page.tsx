import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { 
  getCategoryBySlug, 
  getCategoryArticles, 
  getTrendingInCategory,
  getSiteSettings
} from "@/lib/sanity";
import { CategoryHeader, EmptyCategory } from "@/components/category";
import { HeroStoryCard, CompactStoryCard } from "@/components/stories";
import { AdvertisementBanner } from "@/components/ads";
import { getInlineAd, getArticleBottomAd } from "@/lib/ads";
import { Section, Container } from "@/components/layout/container";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate Dynamic SEO Metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  const category = await getCategoryBySlug(slug);
  const settings = await getSiteSettings();

  if (!category) {
    return { title: "Category Not Found" };
  }

  const siteName = settings?.siteName || "Desi Angreji";
  const title = category.seo?.metaTitle || `${category.name} | ${siteName}`;
  const description = category.seo?.metaDescription || category.description || `Read the latest ${category.name} stories and updates on Desi Angreji.`;
  const url = `${settings?.defaultSeo?.canonicalUrl || "https://desiangreji.com"}/category/${category.slug}`;

  const ogImages = [];
  if (category.seo?.openGraphImage) {
    ogImages.push(category.seo.openGraphImage);
  } else if (category.coverImage) {
    ogImages.push(category.coverImage);
  }

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: category.seo?.focusKeywords,
    alternates: {
      canonical: category.seo?.canonicalUrl || url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
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

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const [articles, trendingArticle, inlineAd, bottomAd] = await Promise.all([
    getCategoryArticles(category.slug, 0, 10),
    getTrendingInCategory(category.slug),
    getInlineAd(),
    getArticleBottomAd()
  ]);

  // Determine featured story (use trending, else first article)
  let featuredStory = trendingArticle;
  let remainingArticles = articles;

  if (!featuredStory && articles.length > 0) {
    featuredStory = articles[0];
    remainingArticles = articles.slice(1);
  } else if (featuredStory) {
    remainingArticles = articles.filter(a => a._id !== featuredStory?._id);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desiangreji.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `${siteUrl}/category/${category.slug}`
      }
    ]
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Category Header */}
      <CategoryHeader category={category} articleCount={articles.length} />

      {/* Empty State */}
      {articles.length === 0 ? (
        <Container>
          <EmptyCategory />
        </Container>
      ) : (
        <>
          {/* Featured Story */}
          {featuredStory && (
            <Section className="pt-8 pb-4">
              <Container>
                <HeroStoryCard article={featuredStory} />
              </Container>
            </Section>
          )}

          {/* Article Grid */}
          {remainingArticles.length > 0 && (
            <Section className="py-8">
              <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {remainingArticles.map(article => (
                    <CompactStoryCard key={article._id} article={article} />
                  ))}
                </div>
              </Container>
            </Section>
          )}

          {/* Inline Ad */}
          {inlineAd && (
            <div className="flex justify-center py-8">
              <AdvertisementBanner ad={inlineAd} />
            </div>
          )}

          {/* Bottom Ad */}
          {bottomAd && (
            <div className="flex justify-center py-8 bg-gray-50 border-t border-gray-100">
              <AdvertisementBanner ad={bottomAd} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
