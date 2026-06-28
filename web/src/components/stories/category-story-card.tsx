import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";

export function CategoryStoryCard({ article, className }: StoryProps) {
  return (
    <article 
      className={cn("group relative flex flex-col gap-2", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 33vw"
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted" />
        )}
        
        {/* Gradient overlay for text readability if we wanted text inside, but here we place it below */}
      </div>

      <div className="flex flex-col mt-2">
        <h3 className="line-clamp-2 text-base font-bold font-heading leading-tight group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        <span className="text-xs text-muted mt-1">{formatDate(article.publishDate)}</span>
      </div>
    </article>
  );
}
