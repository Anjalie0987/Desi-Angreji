import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export interface BreakingNewsTickerProps {
  articles: { title: string; slug: string }[];
  className?: string;
}

export function BreakingNewsTicker({ articles, className }: BreakingNewsTickerProps) {
  if (!articles?.length) return null;

  return (
    <div className={cn("flex items-center gap-4 bg-gray-50 border-y py-2 px-4 sm:px-6 lg:px-8", className)}>
      <Badge variant="breaking" className="shrink-0 uppercase rounded-sm px-3 shadow-sm">
        Latest
      </Badge>
      
      <div className="relative flex flex-1 overflow-hidden">
        {/* Simple CSS animation ticker container */}
        <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
          {articles.map((article, idx) => (
            <Link
              key={idx}
              href={`/story/${article.slug}`}
              prefetch
              className="text-sm font-medium hover:text-brand hover:underline transition-colors font-heading"
            >
              {article.title}
            </Link>
          ))}
          {/* Duplicate for seamless infinite scroll effect */}
          {articles.map((article, idx) => (
            <Link
              key={`dup-${idx}`}
              href={`/story/${article.slug}`}
              className="text-sm font-medium hover:text-brand hover:underline transition-colors font-heading"
              aria-hidden="true"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
