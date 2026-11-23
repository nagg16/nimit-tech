import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Topics",
  description: `Browse ${siteConfig.name} articles by topic.`,
};

export default function TopicsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Topics
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Filter articles by serialization, personalization, caching, architecture, and DevOps.
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map(({ tag, slug, count }) => (
          <li key={slug}>
            <Link
              href={`/topics/${slug}`}
              className="flex items-center justify-between border border-line bg-paper/70 px-4 py-3 transition-colors hover:border-accent"
            >
              <span className="font-medium text-ink">{tag}</span>
              <span className="text-sm text-ink-soft">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
