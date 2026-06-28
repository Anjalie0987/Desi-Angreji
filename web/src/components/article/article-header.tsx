import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { H1 } from "../ui/typography";
import type { ArticleDetail } from "@/lib/sanity";

export function ArticleHeader({ article }: { article: ArticleDetail }) {
  return (
    <header className="mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4 shrink-0" />
        {article.category && (
          <>
            <Link href={`/category/${article.category.slug}`} className="hover:text-brand transition-colors">
              {article.category.name}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 shrink-0" />
          </>
        )}
        <span className="text-gray-900 truncate max-w-[200px] sm:max-w-md">{article.title}</span>
      </nav>

      {/* Category Badge */}
      {article.category && (
        <div className="mb-4">
          <Link 
            href={`/category/${article.category.slug}`}
            className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {article.category.name}
          </Link>
        </div>
      )}

      {/* Title */}
      <H1 className="mb-4 border-b-0 pb-0 text-3xl sm:text-4xl lg:text-5xl leading-tight font-extrabold text-gray-950">
        {article.title}
      </H1>

      {/* Subtitle */}
      {article.subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
          {article.subtitle}
        </p>
      )}
    </header>
  );
}
