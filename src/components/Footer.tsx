import { site } from "@/data/site";
import { Magnetic } from "@/components/Magnetic";
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  GitLabIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";

/**
 * Curtain footer: it sits sticky beneath the page, and the main content
 * (rounded, shadowed) lifts away to reveal it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[90rem] px-5 pt-16 md:px-10 md:pt-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block font-display text-[clamp(1.15rem,5.4vw,3rem)] font-semibold tracking-[-0.03em] text-ink transition-colors [overflow-wrap:anywhere] hover:text-accent md:text-[clamp(1.6rem,3.6vw,3rem)]"
            >
              {site.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <LinkedInIcon size={14} />
                  LinkedIn
                  <ArrowUpRightIcon className="btn-icon" size={12} />
                </a>
              </li>
              <li>
                <a
                  href={site.links.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <GitLabIcon size={14} />
                  GitLab
                  <ArrowUpRightIcon className="btn-icon" size={12} />
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="btn btn-ghost btn-sm">
                  <MailIcon size={14} />
                  Email
                </a>
              </li>
              <li>
                <Magnetic max={6}>
                  <a href="#top" className="icon-btn" aria-label="Back to top" title="Back to top">
                    <ArrowUpIcon />
                  </a>
                </Magnetic>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line py-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.role}
          </p>
          <p>{site.location}</p>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden>
        {site.name}
      </p>
    </footer>
  );
}
