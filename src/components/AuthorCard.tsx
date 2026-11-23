import { formatCertDate, siteConfig } from "@/lib/site";

export function AuthorCard({ compact = false }: { compact?: boolean }) {
  const { author, credlyInfoUrl, credlyProfileUrl } = siteConfig;

  if (compact) {
    return (
      <aside className="mt-12 max-w-3xl border-t border-line pt-8">
        <p className="text-xs tracking-wide text-ink-soft uppercase">Written by</p>
        <p className="mt-1 font-display text-lg font-semibold text-ink">{author.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{author.shortBio}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <a
            href={author.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Credly
          </a>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          Views expressed are my own and do not represent my employer.
        </p>
      </aside>
    );
  }

  return (
    <aside className="mt-10 rounded-sm border border-line bg-paper/80 p-6 sm:p-8">
      <p className="text-xs tracking-wide text-ink-soft uppercase">Author</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{author.name}</h2>
      <p className="mt-1 text-sm font-medium text-accent-deep">{author.role}</p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">{author.shortBio}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {author.specialties.map((item) => (
          <li
            key={item}
            className="border border-line bg-mist/50 px-2.5 py-1 text-xs text-ink-soft"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-xs tracking-wide text-ink-soft uppercase">Certifications</p>
        <p className="mt-1 text-sm text-ink-soft">
          Verified digital badges on{" "}
          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Credly
          </a>{" "}
          (
          <a
            href={credlyInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            about Credly
          </a>
          ).
        </p>
        <ul className="mt-4 space-y-3">
          {author.certifications.map((cert) => (
            <li key={cert.url} className="border border-line bg-mist/30 px-4 py-3">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline-offset-4 hover:text-accent-deep hover:underline"
              >
                {cert.name}
              </a>
              <p className="mt-1 text-xs text-ink-soft">
                {cert.issuer}
                {" · Issued "}
                {formatCertDate(cert.issued)}
                {cert.expires ? ` · Expires ${formatCertDate(cert.expires)}` : null}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a
          href={author.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-deep underline-offset-4 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-deep underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        <a
          href={credlyProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-deep underline-offset-4 hover:underline"
        >
          Credly profile
        </a>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-ink-soft">
        Views expressed on this site are my own and do not represent my employer.
      </p>
    </aside>
  );
}
