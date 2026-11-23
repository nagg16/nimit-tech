import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/articles/${post.slug}`);
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
