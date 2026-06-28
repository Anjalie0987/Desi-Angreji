"use client";

import * as React from "react";
import { H3 } from "../ui/typography";
import { Button } from "../ui/button";
import { Section, Container } from "../layout/container";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <Section className="py-16 bg-brand text-white">
      <Container className="max-w-3xl text-center">
        <Mail className="w-12 h-12 mx-auto mb-6 text-brand-100 opacity-80" />
        <H3 className="text-white border-0 mb-4">Get the latest stories in your inbox</H3>
        <p className="text-brand-100 mb-8 text-lg">
          Join thousands of readers who get our best content delivered straight to their inbox. No spam, ever.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            suppressHydrationWarning
            type="email" 
            placeholder="Your email address" 
            required
            className="flex-1 h-12 px-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button suppressHydrationWarning type="submit" variant="secondary" className="h-12 rounded-full px-8 font-semibold">
            Subscribe
          </Button>
        </form>
      </Container>
    </Section>
  );
}
