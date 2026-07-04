import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/lib/sanity";
import { Section, Container } from "@/components/layout/container";
import { H1, H2 } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "All Categories | Desi Angreji",
  description: "Browse all topics and categories covered on Desi Angreji.",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Section className="py-12 border-b bg-gray-50">
        <Container>
          <H1 className="mb-4">Browse Categories</H1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our wide range of topics, from breaking news and trending stories to deep dives into culture, business, and technology.
          </p>
        </Container>
      </Section>
      
      <Section className="py-12">
        <Container>
          {(!categories || categories.length === 0) ? (
            <div className="py-20 text-center">
              <H2 className="text-2xl font-semibold mb-2">No categories found</H2>
              <p className="text-muted-foreground">Check back later for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  {category.coverImage && (
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                      <Image
                        src={category.coverImage}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
