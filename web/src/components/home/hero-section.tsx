import * as React from "react";
import { getHomepageHero } from "@/lib/sanity";
import { HeroStoryCard } from "../stories";
import { Section, Container } from "../layout/container";

export async function HeroSection() {
  const heroStory = await getHomepageHero();

  if (!heroStory) {
    return null;
  }

  return (
    <Section className="py-4 md:py-6 lg:py-8">
      <Container>
        <HeroStoryCard article={heroStory} />
      </Container>
    </Section>
  );
}
