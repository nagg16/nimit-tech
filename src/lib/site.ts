export const siteConfig = {
  name: "Nimit Tech",
  tagline: "Production notes for SitecoreAI, XM Cloud, and Next.js.",
  description:
    "Practical engineering notes on SitecoreAI, XM Cloud, Next.js, personalization, serialization, caching, and DevOps.",
  url: "https://nagg16.github.io/nimit-tech",
  basePath: "/nimit-tech",
  archiveUrl: "https://nextgentechbynimit.blogspot.com/",
  author: {
    name: "Nimit Aggarwal",
    role: "Technical Lead",
    shortBio:
      "Technical Lead with 12+ years in the Sitecore ecosystem — XP through XM Cloud / SitecoreAI, CDP/Personalize, Content Hub, and OrderCloud — leading delivery teams on major enterprise engagements.",
    specialties: [
      "Sitecore XP → XM Cloud / SitecoreAI",
      "CDP / Personalize",
      "Content Hub",
      "OrderCloud",
      "Next.js headless",
      "Azure DevOps",
    ],
    linkedIn: "https://www.linkedin.com/in/nimit-aggarwal-39253655",
    github: "https://github.com/nagg16",
  },
} as const;

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!normalized || normalized === "/") return siteConfig.url;
  return `${siteConfig.url}${normalized}`;
}
