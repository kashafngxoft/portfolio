"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { EASE_OUT, Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TimelineProgress } from "@/components/TimelineProgress";

const pad = (value: number) => String(value).padStart(2, "0");

/** Bullets shaped "Project — detail" link the project name to its case study. */
function Bullet({ text }: { text: string }) {
  const [lead, ...rest] = text.split(" — ");
  const project = rest.length > 0 ? projects.find((p) => p.title === lead) : undefined;
  if (!project) return <>{text}</>;

  return (
    <>
      <Link
        href={`/work/${project.slug}`}
        transitionTypes={["nav-forward"]}
        className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        {lead}
      </Link>
      {` — ${rest.join(" — ")}`}
    </>
  );
}

export function Experience() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const job = experience[active];

  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="03"
              eyebrow="Experience"
              title="Where I've shipped"
              titleClassName="text-[clamp(2.6rem,5.2vw,5rem)]"
            />
            <div className="mt-14 hidden lg:block" aria-hidden>
              <div className="flex items-end gap-6">
                <div className="relative h-[8.5rem] w-[11rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.span
                      key={active}
                      className="exp-counter absolute inset-0"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                    >
                      {pad(active + 1)}
                    </m.span>
                  </AnimatePresence>
                </div>
                <span className="pb-4 font-mono text-xs text-ink-subtle">/ {pad(experience.length)}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="mt-6 border-t border-line pt-5"
                >
                  <p className="font-display text-xl font-semibold tracking-tight text-ink">
                    {job.company}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-subtle">{job.period}</p>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <TimelineProgress>
            <ol className="space-y-16 md:space-y-24">
              {experience.map((item, index) => {
                const isCurrent = item.period.includes("Present");
                return (
                  <li
                    key={`${item.company}-${item.period}`}
                    ref={(node) => {
                      items.current[index] = node;
                    }}
                    data-index={index}
                    className={`exp-item grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 md:gap-x-8 ${
                      index === active ? "is-active" : ""
                    }`}
                  >
                    <div className="flex justify-center pt-2">
                      <span
                        className={`timeline-node ${isCurrent ? "is-current" : ""}`}
                        aria-hidden
                      />
                    </div>
                    <Reveal>
                      <article>
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-mono text-[0.75rem] tracking-wide text-ink-muted">
                            {item.period}
                          </p>
                          {isCurrent ? (
                            <span className="tag border-accent/40 text-accent">Current</span>
                          ) : null}
                        </div>
                        <h3 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                          {item.role}
                        </h3>
                        <p className="mt-3 text-lg text-ink-muted">
                          <span className="text-ink">{item.company}</span> · {item.location}
                        </p>
                        <ul className="mt-8 space-y-4 border-t border-line pt-6">
                          {item.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-4 text-[1rem] leading-relaxed text-ink-muted"
                            >
                              <span
                                className="mt-[0.78rem] h-px w-4 shrink-0 bg-accent"
                                aria-hidden
                              />
                              <span>
                                <Bullet text={bullet} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </TimelineProgress>
        </div>
      </div>
    </section>
  );
}
