import * as React from "react";
import { getHomepageLatest } from "@/lib/sanity";
import { LatestStoryCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H2 } from "../ui/typography";

export async function LatestSection() {
  const latestStories = await getHomepageLatest();

  if (!latestStories || latestStories.length === 0) {
    return null;
  }

  return (
    <Section className="py-8">
      <Container>
        <H2 className="mb-8">Latest Stories</H2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestStories.map((article) => (
            <LatestStoryCard key={article._id} article={article} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
