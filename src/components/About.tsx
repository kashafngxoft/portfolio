import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { CodeWindow } from "@/components/CodeWindow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GraduationCapIcon } from "@/components/icons";

/** "3.94 / 4.00" → ["3.94", "4.00"]; anything else is shown whole. */
function splitScore(score: string): [string, string | null] {
  const [value, outOf] = score.split(" / ");
  return outOf ? [value, outOf] : [score, null];
}

export function About() {
  const current = experience.find((job) => job.period.includes("Present"));

  const details = [
    { label: "Based in", value: site.location },
    current ? { label: "Currently", value: `${current.role} · ${current.company}` } : null,
    { label: "Education", value: `${site.education.degree} · ${site.education.school}` },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
  ].filter((detail) => detail !== null);

  const scores = [
    { label: "GPA", value: site.education.gpa },
    { label: "CGPA", value: site.education.cgpa },
  ];

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            className="lg:col-span-7"
            index="04"
            eyebrow="About"
            title="Full stack, product-minded"
            titleClassName="text-[clamp(2.8rem,6.6vw,6.5rem)]"
          />
          <RevealGroup as="ul" className="border-t border-line lg:col-span-5">
            {details.map((detail) => (
              <RevealItem
                as="li"
                key={detail.label}
                className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4"
              >
                <span className="pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-subtle">
                  {detail.label}
                </span>
                <span className="break-words text-[0.95rem] text-ink">
                  {"href" in detail && detail.href ? (
                    <a href={detail.href} className="transition-colors hover:text-accent">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div id="skills" className="mt-28 grid gap-14 md:mt-40 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="section-eyebrow">Toolkit</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  Technical skills
                </h3>
              </Reveal>
              <Reveal delayMs={120} className="mt-10 max-w-md">
                <CodeWindow />
              </Reveal>
            </div>
          </div>

          <RevealGroup as="ul" className="lg:col-span-7" stagger={0.1}>
            {skillGroups.map((group, index) => (
              <RevealItem as="li" key={group.label} className="skill-row">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
                    {group.label}
                  </span>
                  <span className="font-mono text-[0.65rem] text-ink-subtle" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-display text-[clamp(1.45rem,2.6vw,2.3rem)] font-semibold leading-snug tracking-[-0.025em] text-ink">
                  {group.items.map((item, itemIndex) => (
                    <li key={item} className="skill-item">
                      {item}
                      {itemIndex < group.items.length - 1 ? (
                        <span className="ml-3 font-normal text-ink-subtle/50" aria-hidden>
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div id="education" className="mt-28 grid gap-12 border-t border-line pt-16 md:mt-40 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="section-eyebrow flex items-center gap-2">
              <GraduationCapIcon size={14} />
              Education
            </p>
            <h3 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              {site.education.degree}
            </h3>
            <p className="mt-4 text-lg text-ink-muted">{site.education.school}</p>
            <p className="mt-1 font-mono text-sm text-ink-subtle">{site.education.years}</p>
          </Reveal>
          <RevealGroup as="ul" className="grid gap-10 sm:grid-cols-2 lg:col-span-7" stagger={0.12}>
            {scores.map((score) => {
              const [value, outOf] = splitScore(score.value);
              return (
                <RevealItem as="li" key={score.label} className="border-t border-line-strong pt-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-subtle">
                    {score.label}
                  </p>
                  <p className="mt-3 flex items-baseline gap-3 whitespace-nowrap">
                    <span className="text-gradient font-display text-[clamp(4rem,9vw,8.5rem)] font-bold leading-none tracking-[-0.05em]">
                      {value}
                    </span>
                    {outOf ? (
                      <span className="font-display text-xl text-ink-subtle md:text-2xl">
                        / {outOf}
                      </span>
                    ) : null}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
