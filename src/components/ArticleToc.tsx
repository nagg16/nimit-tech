"use client";

import type { TocItem } from "@/lib/posts";

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length < 4) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 border border-line bg-mist/40 p-4 sm:sticky sm:top-20 sm:mb-0 sm:max-h-[calc(100vh-6rem)] sm:overflow-y-auto sm:p-5"
    >
      <p className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
        On this page
      </p>
      <ol className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-sm leading-snug text-ink-soft transition-colors hover:text-accent-deep"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
