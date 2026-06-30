import * as React from "react";
import { getHomepageEditorsPicks } from "@/lib/sanity";
import { EditorsPickCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H2 } from "../ui/typography";

export async function EditorsSection() {
  const picks = await getHomepageEditorsPicks();

  if (!picks || picks.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 bg-white">
      <Container>
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <H2 className="border-b-0 m-0">Editor&apos;s Picks</H2>
          <p className="text-muted mt-2">Hand-picked stories for you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {picks.map((article) => (
            <EditorsPickCard key={article._id} article={article} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
