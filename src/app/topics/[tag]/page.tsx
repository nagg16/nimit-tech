import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllTags, getPostsByTag, getTagBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) return { title: "Topic not found" };
  return {
    title: tag,
    description: `Articles tagged ${tag} on Nimit Tech.`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) notFound();
  const posts = getPostsByTag(tagSlug);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <Link
        href="/topics"
        className="text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
      >
        ← All topics
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {tag}
      </h1>
      <p className="mt-3 text-ink-soft">
        {posts.length} article{posts.length === 1 ? "" : "s"}
      </p>
      <div className="mt-10">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
