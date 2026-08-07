import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p className="tracking-tight">
          © {year} {site.name}
        </p>
        <div className="flex gap-6 text-[0.75rem] tracking-wide">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={site.links.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitLab
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-ink"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
