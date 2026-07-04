import { Metadata } from "next";
import { searchArticles } from "@/lib/sanity";
import { Section, Container } from "@/components/layout/container";
import { CompactStoryCard } from "@/components/stories";

export const metadata: Metadata = {
  title: "Search Results | Desi Angreji",
};

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const query = (searchParams?.q as string) || "";
  const articles = query ? await searchArticles(query) : [];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Section className="py-12 border-b bg-gray-50">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {query ? `Search Results for "${query}"` : "Search"}
          </h1>
          {query && (
            <p className="text-muted-foreground text-lg">
              {articles.length} {articles.length === 1 ? "result" : "results"} found
            </p>
          )}
        </Container>
      </Section>
      <Section className="py-12">
        <Container>
          {articles.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground">
                Try searching with different keywords or browse our categories.
              </p>
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
