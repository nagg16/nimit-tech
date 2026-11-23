import type { Metadata } from "next";
import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author.name} and ${siteConfig.name} — SitecoreAI, XM Cloud, and Next.js engineering notes.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <p className="font-display text-4xl font-semibold tracking-tight text-ink">
        {siteConfig.name}
      </p>
      <h1 className="mt-3 font-display text-2xl font-medium text-ink-soft">
        Practical SitecoreAI engineering for delivery teams.
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          {siteConfig.name} is a technical blog for architects, developers, and DevOps
          engineers shipping SitecoreAI (XM Cloud), Next.js headless experiences,
          personalization, content serialization, caching, and CI/CD pipelines.
        </p>
        <p>
          Posts focus on production patterns: how systems actually fail in CI, how to
          design cache invalidation across Edge and Next.js, and how to keep
          personalization fast without breaking rendering.
        </p>
      </div>
      <AuthorCard />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/articles"
          className="inline-flex bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          Read the articles
        </Link>
        <a
          href={siteConfig.author.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex border border-line bg-paper/70 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
        >
          Follow on LinkedIn
        </a>
      </div>
    </div>
  );
}
