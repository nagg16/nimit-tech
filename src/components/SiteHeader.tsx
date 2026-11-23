import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const posts = getAllPosts();

  return (
    <header className="relative z-20 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs tracking-[0.18em] text-ink-soft uppercase sm:inline">
              Engineering
            </span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <SearchBox posts={posts} />
          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-deep"
            >
              Follow
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
