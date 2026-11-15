import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src =
  "C:/Users/nimita/.cursor/projects/c-projects-nimit-techincal-site/agent-tools/6fa23842-5c50-4c8c-a251-70ca3f2732ae.txt";

const postsMeta = [
  {
    slug: "sitecoreai-xm-cloud-content-serialization",
    title:
      "SitecoreAI/XM Cloud Content Serialization: Troubleshooting CI/CD Deployment Failures",
    tags: ["SitecoreAI", "XM Cloud", "SCS", "DevOps"],
    description:
      "Diagnose Sitecore Content Serialization failures in SitecoreAI/XM Cloud CI/CD pipelines and build a reliable module dependency strategy.",
  },
  {
    slug: "sitecoreai-personalization-nextjs",
    title:
      "SitecoreAI Personalization with Next.js: Architecture, Performance and Production Troubleshooting",
    tags: ["SitecoreAI", "Next.js", "Personalize", "CDP"],
    description:
      "Practical architecture for SitecoreAI personalization with Next.js — middleware, Experience Edge, CDP, caching, and production troubleshooting.",
  },
  {
    slug: "xm-cloud-nextjs-cache-invalidation",
    title:
      "Sitecore XM Cloud + Next.js: Designing a Reliable Cache Invalidation Strategy",
    tags: ["XM Cloud", "Next.js", "Caching", "ISR"],
    description:
      "A practical cache-invalidation strategy for Sitecore XM Cloud, Experience Edge, Next.js, and CDN layers.",
  },
  {
    slug: "sitecore-ai-decoupled-deployment",
    title: "Sitecore AI Decoupled Deployment: Converting Coupled Projects",
    tags: ["SitecoreAI", "DevOps", "Architecture"],
    description:
      "How Sitecore AI decoupled deployment separates authoring and editing hosts, and what it means for DevOps.",
  },
  {
    slug: "azure-devops-hosted-vs-self-hosted-agents",
    title:
      "Microsoft-Hosted vs Self-Hosted Agents for Next.js Builds in Azure DevOps",
    tags: ["Azure DevOps", "Next.js", "CI/CD"],
    description:
      "Compare Microsoft-hosted and self-hosted Azure DevOps agents for building Next.js apps in Sitecore XM Cloud contexts.",
  },
];

let text = fs.readFileSync(src, "utf8");
const firstDate = text.search(
  /^## (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),/m,
);
if (firstDate > 0) text = text.slice(firstDate);

const dateRe =
  /^## ((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), .+)$/gm;
const matches = [...text.matchAll(dateRe)];

function parseDate(label) {
  const d = new Date(label.replace(/^\w+,\s*/, ""));
  if (Number.isNaN(d.getTime())) return "2026-01-01";
  return d.toISOString().slice(0, 10);
}

const outDir = path.join(root, "content", "posts");
fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < matches.length; i++) {
  const meta = postsMeta[i];
  if (!meta) continue;

  const start = matches[i].index;
  const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
  let body = text.slice(start, end);
  const dateLabel = matches[i][1].trim();

  body = body.replace(/^## .+\n+/, "");
  body = body.replace(/\n\s*at .+ No comments:\s*$/i, "");

  const lines = body.split("\n");
  if (lines[0]?.startsWith("### ")) {
    const h = lines[0].replace(/^###\s*/, "").trim();
    if (!/^\d+\./.test(h)) {
      lines.shift();
      while (lines[0] === "") lines.shift();
    }
  }
  body = lines.join("\n").trim();

  const fm = [
    "---",
    `title: ${JSON.stringify(meta.title)}`,
    `date: ${parseDate(dateLabel)}`,
    `description: ${JSON.stringify(meta.description)}`,
    `tags: [${meta.tags.map((t) => JSON.stringify(t)).join(", ")}]`,
    `source: "https://nextgentechbynimit.blogspot.com/"`,
    "---",
    "",
    body,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, `${meta.slug}.md`), fm);
  console.log("Wrote", meta.slug, `(${fm.length} chars)`);
}
