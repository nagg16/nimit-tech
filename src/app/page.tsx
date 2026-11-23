import Link from "next/link";
import { ArchitectureHeroVisual } from "@/components/ArchitectureHeroVisual";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();

  return (
    <>
      <section className="relative">
        <div className="mx-auto grid w-full max-w-6xl gap-0 px-5 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end lg:gap-10 lg:pt-14">
          <div className="pb-8 lg:pb-14">
            <p className="animate-rise font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </p>
            <h1 className="animate-rise-delay-1 mt-4 max-w-xl font-display text-2xl font-medium tracking-tight text-ink-soft sm:text-3xl">
              {siteConfig.tagline}
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              Deep dives on serialization, personalization, caching, and CI/CD for teams
              shipping SitecoreAI and headless Next.js experiences.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Browse articles
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center border border-line bg-paper/70 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
              >
                About
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full lg:mt-0">
          <ArchitectureHeroVisual />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Start here
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            New to the site? These posts cover the patterns teams ask about first.
          </p>
        </div>
        <div>
          {featured.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Latest articles
            </h2>
            <p className="mt-2 text-ink-soft">
              Practical engineering from real SitecoreAI / XM Cloud delivery work.
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-medium text-accent-deep underline-offset-4 hover:underline sm:inline"
          >
            View all
          </Link>
        </div>
        <div>
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
