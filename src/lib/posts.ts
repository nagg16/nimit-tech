import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  source?: string;
  testedWith?: string;
  featured?: boolean;
  related?: string[];
};

export type Post = PostMeta & {
  content: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    source: data.source ? String(data.source) : undefined,
    testedWith: data.testedWith ? String(data.testedWith) : undefined,
    featured: Boolean(data.featured),
    related: Array.isArray(data.related) ? data.related.map(String) : undefined,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const { content: _content, ...meta } = readPostFile(fileName);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return readPostFile(`${slug}.md`);
}

export function getFeaturedPosts(): PostMeta[] {
  const featured = getAllPosts().filter((p) => p.featured);
  if (featured.length > 0) return featured;
  return getAllPosts().slice(0, 2);
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s/-]/g, "")
    .replace(/[/\s]+/g, "-");
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: slugifyTag(tag), count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}

export function getTagBySlug(tagSlug: string): string | null {
  const match = getAllTags().find((t) => t.slug === tagSlug);
  return match?.tag ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const bySlug = new Map(getAllPosts().map((p) => [p.slug, p]));
  const picked: PostMeta[] = [];

  for (const relatedSlug of current.related ?? []) {
    const post = bySlug.get(relatedSlug);
    if (post && post.slug !== slug) picked.push(post);
    if (picked.length >= limit) return picked;
  }

  const scored = getAllPosts()
    .filter((p) => p.slug !== slug && !picked.some((x) => x.slug === p.slug))
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1));

  for (const item of scored) {
    picked.push(item.post);
    if (picked.length >= limit) break;
  }

  if (picked.length < limit) {
    for (const post of getAllPosts()) {
      if (post.slug === slug || picked.some((x) => x.slug === post.slug)) continue;
      picked.push(post);
      if (picked.length >= limit) break;
    }
  }

  return picked;
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    next: index > 0 ? posts[index - 1] : null,
    prev: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`#]/g, "").trim();
    if (!text) continue;
    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

/** Format YYYY-MM-DD without timezone shift. */
export function formatDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!match) return date;
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) return date;
  return `${MONTHS[monthIndex]} ${day}, ${year}`;
}

export function parseDateOnly(date: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!match) return new Date(date);
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
}
