import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

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
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <Link
        href="/articles"
        className="text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
      >
        ← All articles
      </Link>
      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide text-ink-soft uppercase">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.map((tag) => (
            <span key={tag} className="text-accent-deep">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.description}</p>
      </header>
      <div className="mt-10">
        <Markdown content={post.content} />
      </div>
      {post.source ? (
        <p className="mt-12 max-w-3xl border-t border-line pt-6 text-sm text-ink-soft">
          Originally published on{" "}
          <a
            href={post.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-deep underline-offset-4 hover:underline"
          >
            NextGen Tech by Nimit
          </a>
          .
        </p>
      ) : null}
    </article>
  );
}
