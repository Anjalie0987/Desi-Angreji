import { sanityFetch } from "@/lib/sanity/fetch";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desiangrezi.com";
  
  // Fetch latest 20 articles
  const articles = await sanityFetch<any[]>({
    query: `*[_type == "article" && status == "published"] | order(publishDate desc)[0...20]{
      title,
      slug,
      excerpt,
      publishDate,
      "authorName": author->name,
      "categoryName": category->name
    }`,
    tags: ["article"]
  });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Desi Angrezi</title>
    <link>${siteUrl}</link>
    <description>Modern content publishing platform for the latest news and engaging stories.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/story/${article.slug?.current}</link>
      <description><![CDATA[${article.excerpt || ""}]]></description>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
      ${article.authorName ? `<author>${article.authorName}</author>` : ""}
      ${article.categoryName ? `<category>${article.categoryName}</category>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
