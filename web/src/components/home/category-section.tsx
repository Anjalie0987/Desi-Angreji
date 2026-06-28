import * as React from "react";
import Link from "next/link";
import { getHomepageCategories } from "@/lib/sanity";
import { CategoryStoryCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H2 } from "../ui/typography";
import { Button } from "../ui/button";

export async function CategorySection() {
  const categories = await getHomepageCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <>
      {categories.map((category) => {
        if (!category.articles || category.articles.length === 0) return null;

        return (
          <Section key={category._id} className="py-8 border-t">
            <Container>
              <div className="flex items-center justify-between mb-8 border-b pb-4 border-gray-100">
                <H2 className="border-b-0 pb-0 m-0 text-brand flex items-center gap-2">
                  <span className="w-2 h-8 bg-brand block rounded-full" aria-hidden="true" />
                  {category.name}
                </H2>
                <Button variant="outline" asChild size="sm">
                  <Link href={`/category/${category.slug}`}>View All</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.articles.map((article) => (
                  <CategoryStoryCard key={article._id} article={article} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
