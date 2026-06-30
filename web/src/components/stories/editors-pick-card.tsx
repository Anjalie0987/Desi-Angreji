import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { StoryProps } from "./types";
import { Badge } from "../ui/badge";

export function EditorsPickCard({ article, className }: StoryProps) {
  return (
    <article 
      className={cn("group relative flex flex-col items-center text-center p-6 bg-gradient-to-b from-brand/5 to-transparent rounded-2xl border border-brand/20", className)}

    >
      <Link href={`/story/${article.slug}`} prefetch className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
      
      <Badge variant="cyan" className="mb-6 scale-110 shadow-sm uppercase tracking-wider text-[10px]">
        Editor&apos;s Pick
      </Badge>

      <h3 className="line-clamp-3 text-2xl font-bold font-heading leading-tight group-hover:text-brand transition-colors max-w-lg">
        {article.title}
      </h3>
      
      {article.excerpt && (
        <p className="mt-4 line-clamp-2 text-sm text-muted max-w-md">
          {article.excerpt}
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        {article.author && article.author.photo ? (
           <Image src={article.author.photo} alt={article.author.name} width={40} height={40} className="rounded-full ring-2 ring-white shadow-sm" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 ring-2 ring-white shadow-sm" />
        )}
        <div className="text-xs">
          <span className="font-semibold text-foreground">{article.author?.name || "Editorial Team"}</span>
          <span className="text-muted block mt-0.5">{formatDate(article.publishDate)}</span>
        </div>
      </div>
    </article>
  );
}
