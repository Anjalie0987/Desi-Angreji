import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";

export function CompactStoryCard({ article, className }: StoryProps) {
  return (
    <article 
      className={cn("group relative flex items-center gap-4 py-3 transition-colors hover:bg-gray-50 rounded-lg px-2 -mx-2", className)}
    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-md">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted" />
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold font-heading leading-tight group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted">
          {article.category && (
            <span className="font-medium text-brand">{article.category.name}</span>
          )}
          <span>•</span>
          <span>{formatDate(article.publishDate)}</span>
        </div>
      </div>
    </article>
  );
}
