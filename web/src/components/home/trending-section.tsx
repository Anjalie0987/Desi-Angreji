import * as React from "react";
import { getHomepageTrending } from "@/lib/sanity";
import { TrendingStoryCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H3 } from "../ui/typography";

export async function TrendingSection() {
  const trendingStories = await getHomepageTrending();

  if (!trendingStories || trendingStories.length === 0) {
    return null;
  }

  return (
    <Section className="py-4 md:py-8 bg-gray-50 border-y">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <H3 className="border-b-0 m-0">Trending Now</H3>
        </div>
        
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 snap-x snap-mandatory hide-scrollbar">
          {trendingStories.map((article, idx) => (
            <div key={article._id} className="w-[85vw] sm:w-auto shrink-0 snap-start">
              <TrendingStoryCard article={article} rank={idx + 1} className="h-full bg-white shadow-sm border" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
