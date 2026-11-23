import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { ArticleToc } from "@/components/ArticleToc";
import { Markdown } from "@/components/Markdown";
import {
  extractToc,
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getReadingTime,
  getRelatedPosts,
  slugifyTag,
} from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const url = absoluteUrl(`/articles/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = getReadingTime(post.content);
  const toc = extractToc(post.content);
  const related = getRelatedPosts(slug);
  const { prev, next } = getAdjacentPosts(slug);
  const canonical = absoluteUrl(`/articles/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.linkedIn,
    },
    mainEntityOfPage: canonical,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/articles"
        className="text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
      >
        ← All articles
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <div>
          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide text-ink-soft uppercase">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{readingTime} min read</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/topics/${slugifyTag(tag)}`}
                  className="text-accent-deep underline-offset-2 hover:underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            <p className="mt-3 text-sm text-ink-soft">
              By{" "}
              <Link href="/about" className="font-medium text-accent-deep hover:underline">
                {siteConfig.author.name}
              </Link>
              {post.testedWith ? (
                <>
                  {" "}
                  · Tested with <span className="text-ink">{post.testedWith}</span>
                </>
              ) : null}
            </p>
          </header>

          <div className="mt-8 lg:hidden">
            <ArticleToc items={toc} />
          </div>

          <div className="mt-10">
            <Markdown content={post.content} />
          </div>

          {post.source ? (
            <p className="mt-12 max-w-3xl border-t border-line pt-6 text-sm text-ink-soft">
              Originally published on Blogspot. Canonical version is this page. Archive:{" "}
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-deep underline-offset-4 hover:underline"
              >
                {siteConfig.archiveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
              .
            </p>
          ) : null}

          <AuthorCard compact />

          {(prev || next) && (
            <nav className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              {prev ? (
                <Link href={`/articles/${prev.slug}`} className="group block">
                  <p className="text-xs tracking-wide text-ink-soft uppercase">Previous</p>
                  <p className="mt-1 text-sm font-medium text-ink group-hover:text-accent-deep">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/articles/${next.slug}`} className="group block sm:text-right">
                  <p className="text-xs tracking-wide text-ink-soft uppercase">Next</p>
                  <p className="mt-1 text-sm font-medium text-ink group-hover:text-accent-deep">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-xl font-semibold text-ink">Related articles</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/articles/${item.slug}`}
                      className="text-accent-deep underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <ArticleToc items={toc} />
        </aside>
      </div>
    </article>
  );
}
