import * as React from "react";
import { getLatestArticles } from "@/lib/sanity";
import type { ArticleCard } from "@/lib/sanity";
import { LatestStoryCard, CompactStoryCard } from "../stories";
import { H2 } from "../ui/typography";
import { Section, Container } from "../layout/container";

interface ContinueReadingProps {
  nextStory?: ArticleCard | null;
  currentId?: string;
}

export async function ContinueReading({ nextStory, currentId }: ContinueReadingProps) {
  const latestRaw = await getLatestArticles(4);
  const latest = latestRaw.filter(a => a._id !== currentId && a._id !== nextStory?._id).slice(0, 3);

  if (!nextStory && latest.length === 0) return null;

  return (
    <Section className="py-12 bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="text-center mb-10">
          <H2 className="border-b-0 m-0">Continue Reading</H2>
          <p className="text-muted mt-2">More stories you might like</p>
        </div>
        
        <div className="flex flex-col gap-10">
          {nextStory && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 sm:p-6 lg:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                Up Next
              </h3>
              <CompactStoryCard article={nextStory} />
            </div>
          )}

          {latest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {latest.map(article => (
                <LatestStoryCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
