import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-line py-7 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide text-ink-soft uppercase">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-accent-deep">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
        <Link href={`/articles/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
        {post.description}
      </p>
      <Link
        href={`/articles/${post.slug}`}
        className="mt-3 inline-flex text-sm font-medium text-accent-deep underline-offset-4 transition-all hover:underline"
      >
        Read article
      </Link>
    </article>
  );
}
