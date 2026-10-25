import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { Magnetic } from "@/components/Magnetic";
import { Parallax } from "@/components/Parallax";
import { ArrowRightIcon, GitLabIcon, LinkedInIcon } from "@/components/icons";

const current = experience.find((job) => job.period.includes("Present"));

const facts = [
  current ? { label: "Currently", value: `${current.role} · ${current.company}` } : null,
  { label: "Based in", value: site.location },
  { label: "Focus", value: "FastAPI · React · Next.js · Python" },
].filter((fact): fact is { label: string; value: string } => fact !== null);

/** CSS custom properties for staggered entrance delays (ms). */
const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

/** One line of the name, revealed character by character inside a line mask. */
function NameLine({ text, start, gradient = false }: { text: string; start: number; gradient?: boolean }) {
  const chars = Array.from(text);
  return (
    <span className="line-mask">
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`hero-char ${gradient ? "hero-char--gradient" : ""}`}
          style={
            {
              "--d": start + index * 55,
              "--ci": index,
              "--cn": chars.length,
            } as React.CSSProperties
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="top" className="hero relative flex min-h-[100svh] flex-col">
      <div className="hero-guides" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-28">
        <div
          className="hero-rise relative flex flex-wrap items-center justify-between gap-4"
          style={delay(0)}
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.78rem] text-ink-muted backdrop-blur-md">
            <span className="status-dot" aria-hidden />
            Open to opportunities &amp; collaborations
          </p>
          <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ink-subtle sm:block">
            {site.location}
          </p>
        </div>

        <h1 className="hero-name my-auto py-10 font-display font-bold text-ink">
          <span className="sr-only">{site.name}</span>
          {/* Front layer sits above the WebGL sculpture… */}
          <Parallax as="span" x="-9vw" range={900} className="relative block">
            <span className="hero-depth hero-depth--front block" aria-hidden>
              <NameLine text={first} start={250} />
            </span>
          </Parallax>
          {/* …the second line sits behind it for layered depth. */}
          <Parallax as="span" x="9vw" range={900} className="relative -z-10 block">
            <span className="hero-depth hero-depth--back block pl-[12vw] lg:pl-[15vw]" aria-hidden>
              <NameLine text={last} start={520} gradient />
            </span>
          </Parallax>
        </h1>

        <div className="relative grid gap-8 pb-7 lg:grid-cols-12 lg:items-end">
          <div className="hero-rise lg:col-span-5" style={delay(760)}>
            <p className="section-eyebrow">{site.role}</p>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-muted md:text-lg">
              {site.tagline}
            </p>
          </div>
          <div
            className="hero-rise flex flex-wrap items-center gap-3 lg:col-span-7 lg:justify-end"
            style={delay(880)}
          >
            <Magnetic>
              <a href="#work" className="btn btn-primary">
                View projects
                <ArrowRightIcon className="btn-icon" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Contact me
              </a>
            </Magnetic>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
            <Magnetic max={6}>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn profile (opens in a new tab)"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </Magnetic>
            <Magnetic max={6}>
              <a
                href={site.links.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitLab profile (opens in a new tab)"
                title="GitLab"
              >
                <GitLabIcon />
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          className="hero-rise relative flex items-end justify-between gap-8 border-t border-line pt-5"
          style={delay(1000)}
        >
          <dl className="grid flex-1 gap-3 sm:grid-cols-3 sm:gap-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#intro"
            className="scroll-cue hidden shrink-0 flex-col items-center gap-2 text-ink-subtle md:flex"
            aria-label="Scroll to introduction"
          >
            <span className="scroll-cue-track" aria-hidden>
              <span className="scroll-cue-dot" />
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]" aria-hidden>
              Scroll
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
