import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";
import { Badge } from "../ui/badge";

export function HorizontalStoryCard({ article, className }: StoryProps) {
  return (
    <article 
      className={cn("group relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-xl border bg-background transition-shadow hover:shadow-md", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <div className="relative aspect-video sm:aspect-square sm:w-48 lg:w-64 shrink-0 overflow-hidden">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 300px"
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 sm:pl-0">
        <div className="mb-2 flex items-center gap-2">
          {article.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {article.category.name}
            </span>
          )}
          {article.editorsPick && <Badge variant="cyan" className="scale-75 origin-left">Editor's Pick</Badge>}
        </div>
        
        <h3 className="line-clamp-2 text-xl font-bold font-heading leading-tight group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {article.excerpt}
          </p>
        )}
        
        <div className="mt-auto flex items-center gap-3 text-xs text-muted pt-4">
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
