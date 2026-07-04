import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { ArticleDetail } from "@/lib/sanity";

export function ArticleMeta({ article }: { article: ArticleDetail }) {
  if (!article.author) return null;

  const readTime = article.estimatedReadingTime || calculateReadingTime(article.excerpt || "");

  return (
    <div className="flex items-center gap-3 py-3 border-y border-gray-100 my-6">
      {/* Author Photo */}
      <Link href={`/author/${article.author.slug}`} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {article.author.photo ? (
          <Image
            src={article.author.photo}
            alt={article.author.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
            {article.author.name.charAt(0)}
          </span>
        )}
      </Link>

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-x-1">
        <div>
          By <Link href={`/author/${article.author.slug}`} className="font-medium text-gray-700 hover:text-brand transition-colors">{article.author.name}</Link>
        </div>
        <span aria-hidden="true" className="hidden sm:inline">&bull;</span>
        <div className="flex flex-wrap items-center gap-x-1">
          <span>Published</span>
          {article.publishDate && (
            <time dateTime={article.publishDate}>
              {formatDate(article.publishDate)}
            </time>
          )}
          <span aria-hidden="true">&bull;</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </div>
  );
}
