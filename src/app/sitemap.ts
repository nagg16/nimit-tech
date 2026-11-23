import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/articles", "/about", "/topics"].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
  }));

  const articles = getAllPosts().map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: new Date(post.date),
  }));

  const topics = getAllTags().map(({ slug }) => ({
    url: absoluteUrl(`/topics/${slug}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articles, ...topics];
}
