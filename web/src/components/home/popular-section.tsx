import * as React from "react";
import { getHomepagePopular } from "@/lib/sanity";
import { CompactStoryCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H3 } from "../ui/typography";
import { LoadMoreSection } from "./load-more-section";

export async function PopularSection() {
  const popular = await getHomepagePopular();

  if (!popular || popular.length === 0) {
    return null;
  }

  const sortedPopular = [...popular].sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <>
      <Section className="py-8 bg-gray-50 border-t">
        <Container>
          <H3 className="mb-6">Popular Stories</H3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {sortedPopular.map((article) => (
              <CompactStoryCard key={article._id} article={article} />
            ))}
          </div>
        </Container>
      </Section>
      <LoadMoreSection show={sortedPopular.length > 3} />
    </>
  );
}
