export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  url: string;
};

export const siteConfig = {
  name: "Nimit Tech",
  tagline: "Production notes for SitecoreAI, XM Cloud, and Next.js.",
  description:
    "Practical engineering notes on SitecoreAI, XM Cloud, Next.js, personalization, serialization, caching, and DevOps.",
  url: "https://nagg16.github.io/nimit-tech",
  basePath: "/nimit-tech",
  archiveUrl: "https://nextgentechbynimit.blogspot.com/",
  credlyInfoUrl: "https://info.credly.com/",
  credlyProfileUrl: "https://www.credly.com/users/nimit-aggarwal.c3436c5a/badges/credly",
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
    certifications: [
      {
        name: "Optimizely Certified CMS PaaS Developer (Advanced, 2027)",
        issuer: "Optimizely",
        issued: "2026-10-06",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/16acad8a-1fbc-41f2-a7ac-45b71c72886b/public_url",
      },
      {
        name: "Optimizely Certified Agent Platform Practitioner (Core, 2027)",
        issuer: "Optimizely",
        issued: "2026-10-03",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/cc63bd25-26ce-47ae-9817-c8a442614b94/public_url",
      },
      {
        name: "Optimizely Certified CMS SaaS Developer (Core, 2027)",
        issuer: "Optimizely",
        issued: "2026-09-25",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/2a46c51e-83da-431a-ba17-0b0788d8e6b6/public_url",
      },
      {
        name: "Optimizely Multi-Product Champion (2027)",
        issuer: "Optimizely",
        issued: "2026-09-25",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/97f76f5a-723a-41e8-b55e-fa73ff299f57/public_url",
      },
      {
        name: "Optimizely Certified CMS PaaS Developer (Core, 2027)",
        issuer: "Optimizely",
        issued: "2026-09-21",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/c06ca27e-62c8-46b9-b596-f50cc3b14d7d/public_url",
      },
      {
        name: "Optimizely Certified Foundations (2027)",
        issuer: "Optimizely",
        issued: "2026-09-18",
        expires: "2027-12-31",
        url: "https://www.credly.com/badges/4ceca1fc-5488-480a-9091-808ca0193609/public_url",
      },
      {
        name: "SitecoreAI CMS for Developers Certification (2025)",
        issuer: "Sitecore",
        issued: "2026-05-27",
        url: "https://www.credly.com/badges/6b26cff4-4285-4847-acd6-33f3d217b81f/public_url",
      },
    ] satisfies Certification[],
  },
} as const;

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!normalized || normalized === "/") return siteConfig.url;
  return `${siteConfig.url}${normalized}`;
}

export function formatCertDate(date: string): string {
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
