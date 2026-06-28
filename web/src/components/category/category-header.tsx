import * as React from "react";
import Image from "next/image";
import type { Category } from "@/lib/sanity";
import { H1 } from "../ui/typography";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb";

interface CategoryHeaderProps {
  category: Category;
  articleCount?: number;
}

export function CategoryHeader({ category, articleCount }: CategoryHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-gray-100 pb-8 pt-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1 max-w-3xl">
            <H1 className="mb-4">{category.name}</H1>
            {category.description && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            )}
            {typeof articleCount === "number" && (
              <p className="text-sm text-muted-foreground mt-4 font-medium uppercase tracking-wider">
                {articleCount} {articleCount === 1 ? "Story" : "Stories"}
              </p>
            )}
          </div>
          
          {category.coverImage && (
            <div className="w-full md:w-64 lg:w-80 aspect-video md:aspect-square relative rounded-xl overflow-hidden shadow-sm shrink-0">
              <Image 
                src={category.coverImage} 
                alt={category.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
