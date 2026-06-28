import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";
import { Button } from "../ui/button";

export function SocialPreviewCard({ article, className }: StoryProps) {
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-xl border bg-background", className)}>
      <div className="relative aspect-[1200/630] w-full bg-muted">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : null}
      </div>

      <div className="flex flex-col p-5 bg-gray-50 border-t">
        <span className="text-xs font-semibold text-muted mb-1">
          {formatDate(article.publishDate)}
        </span>
        <h3 className="line-clamp-2 text-lg font-bold font-heading leading-snug">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {article.excerpt}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <Button variant="cyan" asChild size="sm" className="font-semibold">
            <Link href={`/story/${article.slug}`}>Read More</Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
