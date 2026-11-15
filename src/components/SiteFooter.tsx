import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-mist/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-ink">Nimit Tech</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">
            SitecoreAI, XM Cloud, Next.js, and DevOps — practical engineering notes
            migrated from NextGen Tech by Nimit.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-ink-soft">
          <Link href="/articles" className="hover:text-accent-deep">
            Articles
          </Link>
          <Link href="/about" className="hover:text-accent-deep">
            About
          </Link>
          <a
            href="https://nextgentechbynimit.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-deep"
          >
            Blogspot archive
          </a>
        </div>
      </div>
    </footer>
  );
}
