"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

const filters = [
  "All",
  "Featured",
  "FastAPI",
  "Next.js",
  "React",
  "Python",
] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    if (filter === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) =>
      p.tech.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
    );
  }, [filter]);

  return (
    <section id="work" className="border-t border-line bg-bg-elevated py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="max-w-xl">
            <p className="section-eyebrow">Selected work</p>
            <h2 className="section-title text-3xl md:text-[2.75rem]">
              Products I&apos;ve built
            </h2>
            <p className="mt-5 text-ink-muted">
              Frontend products and backend APIs—each project listed the same
              way. Screens live in the gallery below.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={60}>
          <div className="mt-12 flex flex-wrap">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`filter-chip ${filter === item ? "is-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {visible.map((project, index) => (
            <li key={project.slug}>
              <Reveal delayMs={index * 40}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group grid gap-3 py-8 transition-colors md:grid-cols-[1fr_auto] md:items-baseline md:gap-10"
                >
                  <div>
                    <p className="section-eyebrow">{project.subtitle}</p>
                    <h3 className="mt-2 font-display text-[1.55rem] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-[1.75rem]">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
                      {project.description}
                    </p>
                    <p className="mt-4 font-mono text-[0.68rem] tracking-[0.08em] text-ink/45 uppercase">
                      {project.tech.slice(0, 5).join(" · ")}
                    </p>
                  </div>
                  <span className="btn-ghost self-start text-[0.75rem] opacity-70 transition-opacity group-hover:opacity-100">
                    Case study →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
