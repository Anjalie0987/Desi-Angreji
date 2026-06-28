import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { H2 } from "../ui/typography";

export function EmptyCategory() {
  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 my-12 max-w-4xl mx-auto">
      <div className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-4xl">📄</span>
      </div>
      <H2 className="border-b-0 m-0 mb-4">No stories available in this category yet.</H2>
      <p className="text-muted-foreground text-lg mb-8 max-w-lg">
        Our editorial team is currently working on exciting content for this category. Check back soon!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">Browse Other Categories</Link>
        </Button>
      </div>
    </div>
  );
}
