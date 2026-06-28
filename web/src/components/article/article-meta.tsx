import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { ArticleDetail } from "@/lib/sanity";

export function ArticleMeta({ article }: { article: ArticleDetail }) {
  if (!article.author) return null;

  const readTime = article.estimatedReadingTime || calculateReadingTime(article.excerpt || "");

  return (
    <div className="flex items-center gap-4 py-6 border-y border-gray-100 my-8">
      {/* Author Photo */}
      <Link href={`/author/${article.author.slug}`} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {article.author.photo ? (
          <Image
            src={article.author.photo}
            alt={article.author.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
            {article.author.name.charAt(0)}
          </span>
        )}
      </Link>

      {/* Meta Info */}
      <div className="flex flex-col justify-center">
        <Link href={`/author/${article.author.slug}`} className="text-base font-semibold text-gray-900 hover:text-brand transition-colors">
          {article.author.name}
        </Link>
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
          {article.publishDate && (
            <time dateTime={article.publishDate}>
              {formatDate(article.publishDate)}
            </time>
          )}
          <span aria-hidden="true">&middot;</span>
          <span>{readTime} min read</span>
          
          {article.updatedDate && article.updatedDate !== article.publishDate && (
            <>
              <span aria-hidden="true" className="hidden sm:inline">&middot;</span>
              <span className="hidden sm:inline italic">Updated {formatDate(article.updatedDate)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
