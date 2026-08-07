import Link from "next/link";
import { site } from "@/data/site";
import { getFeaturedProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/Reveal";

export function About() {
  const featured = getFeaturedProjects();

  return (
    <section id="about" className="border-t border-line bg-bg-elevated py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-20 md:grid-cols-[1.15fr_0.85fr] md:gap-24">
          <Reveal>
            <p className="section-eyebrow">About</p>
            <h2 className="section-title text-3xl md:text-[2.75rem]">
              Full stack, product-minded
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
              {site.about}
            </p>
          </Reveal>

          <div className="space-y-10 md:pt-10">
            {skillGroups.map((group, index) => (
              <Reveal key={group.label} delayMs={index * 60}>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {group.label}
                </h3>
                <p className="mt-2 font-mono text-[0.8rem] leading-7 tracking-wide text-ink-muted">
                  {group.items.join("  ·  ")}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-24 border-t border-line pt-16">
            <p className="section-eyebrow">In production</p>
            <h3 className="section-title mt-3 text-2xl md:text-3xl">
              Projects & stacks
            </h3>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group grid gap-3 py-8 transition-colors md:grid-cols-[minmax(0,12rem)_1fr] md:items-start md:gap-10"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {project.title}
                    </span>
                    <div>
                      <p className="section-eyebrow">{project.subtitle}</p>
                      <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
                        {project.description}
                      </p>
                      <p className="mt-3 text-sm text-ink-muted/90">
                        <span className="text-ink/70">Role — </span>
                        {project.role}
                      </p>
                      <p className="mt-3 font-mono text-[0.7rem] tracking-[0.08em] text-ink/50 uppercase">
                        {project.tech.join(" · ")}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 border-t border-line pt-16">
            <p className="section-eyebrow">Education</p>
            <h3 className="section-title mt-3 text-2xl md:text-3xl">
              {site.education.degree}
            </h3>
            <p className="mt-4 text-ink-muted">{site.education.school}</p>
            <p className="mt-2 text-ink-muted">{site.education.years}</p>
            <dl className="mt-8 grid max-w-md gap-4 sm:grid-cols-2">
              <div className="border border-line bg-bg px-5 py-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.14em] text-ink/45 uppercase">
                  GPA
                </dt>
                <dd className="mt-2 font-display text-xl font-semibold text-ink">
                  {site.education.gpa}
                </dd>
              </div>
              <div className="border border-line bg-bg px-5 py-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.14em] text-ink/45 uppercase">
                  CGPA
                </dt>
                <dd className="mt-2 font-display text-xl font-semibold text-ink">
                  {site.education.cgpa}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
