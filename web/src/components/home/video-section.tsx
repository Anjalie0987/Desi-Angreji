import * as React from "react";
import { getHomepageVideos } from "@/lib/sanity";
import { VideoStoryCard } from "../stories";
import { Section, Container } from "../layout/container";
import { H2 } from "../ui/typography";

export async function VideoSection() {
  const videos = await getHomepageVideos();

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 bg-gray-950 text-white">
      <Container>
        <H2 className="mb-8 text-white border-white/20">Featured Videos</H2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((article) => (
            <VideoStoryCard key={article._id} article={article} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
