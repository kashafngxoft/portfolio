import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="border-t border-line py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title text-3xl md:text-[2.75rem]">
            Where I&apos;ve shipped
          </h2>
        </Reveal>

        <ol className="mt-16">
          {experience.map((job, index) => (
            <li key={`${job.company}-${job.period}`}>
              <Reveal delayMs={index * 80}>
                <article className="grid gap-3 border-t border-line py-12 md:grid-cols-[12rem_1fr] md:gap-16">
                  <p className="font-mono text-[0.75rem] tracking-wide text-ink-muted">
                    {job.period}
                  </p>
                  <div>
                    <h3 className="font-display text-[1.65rem] font-semibold tracking-tight text-ink">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-ink-muted">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-6 max-w-2xl space-y-3 text-[0.95rem] text-ink-muted">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[0.65rem] h-px w-3 shrink-0 bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
