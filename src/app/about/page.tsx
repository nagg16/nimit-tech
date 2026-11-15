import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Nimit Tech — SitecoreAI, XM Cloud, and Next.js engineering notes.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <p className="font-display text-4xl font-semibold tracking-tight text-ink">Nimit Tech</p>
      <h1 className="mt-3 font-display text-2xl font-medium text-ink-soft">
        Engineering notes from SitecoreAI and modern DX delivery.
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          This site collects technical writing by Nimit on SitecoreAI (formerly XM Cloud),
          Next.js headless architectures, personalization, content serialization, caching,
          and Azure DevOps delivery practices.
        </p>
        <p>
          Content has been migrated from{" "}
          <a
            href="https://nextgentechbynimit.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            nextgentechbynimit.blogspot.com
          </a>{" "}
          into a dedicated Next.js site under the smoother GitHub-friendly name{" "}
          <strong className="text-ink">nimit-tech</strong>.
        </p>
        <p>
          Expect practical troubleshooting guides, architecture diagrams, and production
          checklists — written for teams shipping SitecoreAI and headless experiences.
        </p>
      </div>
      <Link
        href="/articles"
        className="mt-10 inline-flex bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
      >
        Read the articles
      </Link>
    </div>
  );
}
