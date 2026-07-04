import type { Metadata } from "next";
import { getTrendingArticles } from "@/lib/sanity";
import { CompactStoryCard } from "@/components/stories";
import { Section, Container } from "@/components/layout/container";
import { H1 } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Trending Stories | Desi Angreji",
  description: "Read the most popular and trending stories on Desi Angreji.",
};

export default async function TrendingPage() {
  const articles = await getTrendingArticles(24);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Section className="py-12 border-b bg-gray-50">
        <Container>
          <H1 className="mb-4">Trending Now</H1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            See what everyone is talking about. These are the most popular stories right now.
          </p>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          {(!articles || articles.length === 0) ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold mb-2">No trending stories right now</h2>
              <p className="text-muted-foreground">Check back later for popular content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <CompactStoryCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
