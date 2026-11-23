import type { Metadata } from "next";
import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author.name} and ${siteConfig.name} — SitecoreAI, XM Cloud, and Next.js engineering notes.`,
};

export default function AboutPage() {
  const { author, credlyProfileUrl } = siteConfig;

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

      <section className="mt-10 border border-line bg-paper/80 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Key certifications
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Listed here as plain text for discoverability. Verified badges:{" "}
          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Credly wallet
          </a>
          .
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
          {author.certifications.map((cert) => (
            <li key={cert.url}>
              <span className="font-medium text-ink">{cert.name}</span>
              {" — "}
              {cert.issuer}
            </li>
          ))}
        </ul>
      </section>

      <AuthorCard />

      <section className="mt-10 border border-line bg-mist/40 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">Work with me</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Looking for SitecoreAI / XM Cloud architecture help, serialization and CI/CD
          hardening, or Next.js personalization and caching reviews? Reach out.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {"email" in author && author.email ? (
            <a
              href={`mailto:${author.email}`}
              className="inline-flex bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Email {author.name.split(" ")[0]}
            </a>
          ) : null}
          <a
            href={author.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-line bg-paper/70 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
          >
            Message on LinkedIn
          </a>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/articles"
          className="inline-flex bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          Read the articles
        </Link>
      </div>
    </div>
  );
}
