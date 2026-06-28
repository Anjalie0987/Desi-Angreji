import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";
import { Badge } from "../ui/badge";

export function VideoStoryCard({ article, className }: StoryProps) {
  return (
    <article 
      className={cn("group relative flex flex-col gap-3", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Watch {article.title}</span>
      </Link>
      
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder={article.featuredImageLqip ? "blur" : "empty"}
            blurDataURL={article.featuredImageLqip}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900" />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform group-hover:scale-110">
            <PlayCircle className="h-10 w-10 text-white" fill="currentColor" />
          </div>
        </div>

        <div className="absolute left-3 top-3 z-20">
          <Badge className="bg-red-600 hover:bg-red-700">Video</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-2">
        <h3 className="line-clamp-2 text-lg font-semibold font-heading leading-snug group-hover:text-brand transition-colors">
          {article.title}
        </h3>
        
        <div className="mt-auto flex items-center gap-3 text-xs text-muted pt-1">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(article.publishDate)}
          </span>
        </div>
      </div>
    </article>
  );
}
