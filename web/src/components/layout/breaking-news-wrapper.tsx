import * as React from "react";
import { getLatestArticles } from "@/lib/sanity";
import { BreakingNewsTicker } from "../stories/breaking-news-ticker";

export async function BreakingNewsWrapper() {
  let displayArticles: any[] = [];
  try {
    const articles = await getLatestArticles(5); 
    if (articles && articles.length > 0) {
      const breaking = articles.filter(a => a.breakingNews);
      displayArticles = breaking.length > 0 ? breaking : articles;
    }
  } catch (error) {
    console.error("Failed to load breaking news", error);
  }

  if (displayArticles.length === 0) return null;

  return <BreakingNewsTicker articles={displayArticles} />;
}

