import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedCategories } from "@/lib/sanity";
import { Section, Container } from "../layout/container";
import { H2 } from "../ui/typography";

export async function FeaturedCategoriesSection() {
  const categories = await getFeaturedCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="mb-8 border-b pb-4 border-gray-200">
          <H2 className="border-b-0 pb-0 m-0 flex items-center gap-2">
            <span className="w-2 h-8 bg-brand block rounded-full" aria-hidden="true" />
            Featured Categories
          </H2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/category/${category.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {category.coverImage && (
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                  <Image
                    src={category.coverImage}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
