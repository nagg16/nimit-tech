import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-mist/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-ink">{siteConfig.name}</p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-ink-soft">
            <Link href="/articles" className="hover:text-accent-deep">
              Articles
            </Link>
            <Link href="/topics" className="hover:text-accent-deep">
              Topics
            </Link>
            <Link href="/about" className="hover:text-accent-deep">
              About
            </Link>
            <Link href="/rss.xml" className="hover:text-accent-deep">
              RSS
            </Link>
            <a
              href={siteConfig.author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-deep"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-deep"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="text-xs text-ink-soft">
          Views expressed are my own and do not represent my employer. Previously published on{" "}
          <a
            href={siteConfig.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            Blogspot
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
