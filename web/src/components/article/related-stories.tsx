import * as React from "react";
import { getRelatedArticles } from "@/lib/sanity";
import { CompactStoryCard } from "../stories";
import { H3 } from "../ui/typography";
import { Section, Container } from "../layout/container";

export async function RelatedStories({ categoryId, currentId }: { categoryId: string, currentId: string }) {
  const related = await getRelatedArticles(categoryId, currentId, 4);

  if (!related || related.length === 0) return null;

  return (
    <Section className="py-8 bg-white border-t border-gray-100">
      <Container>
        <H3 className="mb-6">Related Stories</H3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {related.map(article => (
            <CompactStoryCard key={article._id} article={article} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
