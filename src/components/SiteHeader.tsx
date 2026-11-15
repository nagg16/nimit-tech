import Link from "next/link";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
            Nimit Tech
          </span>
          <span className="hidden text-xs tracking-[0.18em] text-ink-soft uppercase sm:inline">
            Engineering
          </span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7">
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
            href="https://nextgentechbynimit.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-accent-deep md:inline"
          >
            Archive
          </a>
        </nav>
      </div>
    </header>
  );
}
