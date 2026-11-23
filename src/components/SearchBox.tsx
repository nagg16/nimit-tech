"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

export function SearchBox({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const results = useMemo(() => {
    if (!deferred) return [];
    return posts
      .filter((post) => {
        const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
        return haystack.includes(deferred);
      })
      .slice(0, 8);
  }, [deferred, posts]);

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="site-search" className="sr-only">
        Search articles
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles…"
        className="w-full border border-line bg-paper/90 px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
      />
      {deferred && (
        <div className="absolute z-30 mt-1 w-full border border-line bg-paper shadow-sm">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-ink-soft">No matching articles.</p>
          ) : (
            <ul>
              {results.map((post) => (
                <li key={post.slug} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/articles/${post.slug}`}
                    className="block px-3 py-2 text-sm text-ink transition-colors hover:bg-mist/60"
                    onClick={() => setQuery("")}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
