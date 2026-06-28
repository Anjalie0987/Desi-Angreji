import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn, calculateReadingTime, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";
import { Badge } from "../ui/badge";
import { H2, P } from "../ui/typography";

export function HeroStoryCard({ article, className }: StoryProps) {
  const readingTime = article.estimatedReadingTime || calculateReadingTime(article.excerpt || "");
  const fallbackImage = "/placeholder-hero.jpg"; // Use a real placeholder in production

  return (
    <article 
      className={cn("group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[21/9]">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            priority
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
        
        {/* Badges overlay */}
        <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
          {article.breakingNews && <Badge variant="breaking">Breaking News</Badge>}
          {article.editorsPick && <Badge variant="cyan">Editor's Pick</Badge>}
          {article.category && (
            <Badge className="bg-white/90 text-foreground hover:bg-white backdrop-blur-sm shadow-sm">
              {article.category.name}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
        <H2 className="line-clamp-2 border-b-0 pb-0 text-2xl sm:text-3xl lg:text-4xl group-hover:text-brand transition-colors">
          {article.title}
        </H2>
        
        {article.excerpt && (
          <P className="mt-4 line-clamp-2 sm:line-clamp-3 text-muted">
            {article.excerpt}
          </P>
        )}
        
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
          {article.author && (
            <div className="flex items-center gap-2">
              {article.author.photo ? (
                <Image src={article.author.photo} alt={article.author.name} width={24} height={24} className="rounded-full" />
              ) : (
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              )}
              <span className="font-medium text-foreground">{article.author.name}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(article.publishDate)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}
