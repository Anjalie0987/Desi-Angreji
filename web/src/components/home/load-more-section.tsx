"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Section, Container } from "../layout/container";
import { Loader2 } from "lucide-react";

export function LoadMoreSection({ show = true }: { show?: boolean }) {
  const [isLoading, setIsLoading] = React.useState(false);

  if (!show) return null;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Placeholder for actual pagination logic
    setTimeout(() => {
      setIsLoading(false);
      console.log('Analytics Track: Load More clicked');
    }, 1000);
  };

  return (
    <Section className="py-12 border-t">
      <Container className="flex justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleLoadMore}
          disabled={isLoading}
          className="w-full sm:w-auto px-12 rounded-full font-heading font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More Stories"
          )}
        </Button>
      </Container>
    </Section>
  );
}
