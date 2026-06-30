import * as React from "react";

import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";


export function TrendingStoryCard({ article, className, rank }: StoryProps & { rank?: number }) {
  return (
    <article 
      className={cn("group relative flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      {rank && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">
          {rank}
        </div>
      )}

      <div className="flex-1 space-y-2">
        {article.category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            {article.category.name}
          </span>
        )}
        <h3 className="line-clamp-2 text-base font-semibold font-heading leading-tight group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Trending
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(article.publishDate)}
          </span>
        </div>
      </div>
    </article>
  );
}
