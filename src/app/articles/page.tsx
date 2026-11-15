import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles",
  description: "All technical articles on SitecoreAI, XM Cloud, Next.js, and DevOps.",
};

export default function ArticlesPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Articles
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Migrated from nextgentechbynimit.blogspot.com — focused on SitecoreAI, XM Cloud,
        Next.js, and delivery engineering.
      </p>
      <div className="mt-10">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
