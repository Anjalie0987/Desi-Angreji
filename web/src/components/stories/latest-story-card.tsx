import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn, calculateReadingTime, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";

export function LatestStoryCard({ article, className }: StoryProps) {
  const readingTime = article.estimatedReadingTime || calculateReadingTime(article.excerpt || "");

  return (
    <article 
      className={cn("group relative flex flex-col gap-3", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-2">
        {article.category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            {article.category.name}
          </span>
        )}
        <h3 className="line-clamp-2 text-lg font-semibold font-heading leading-snug group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        
        <div className="mt-auto flex items-center gap-3 text-xs text-muted pt-2">
          {article.author && (
            <span className="font-medium text-foreground">{article.author.name}</span>
          )}
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
