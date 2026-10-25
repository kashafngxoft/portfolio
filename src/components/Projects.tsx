"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, ViewTransition } from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { projects, type Project } from "@/data/projects";
import { EASE_OUT, Reveal } from "@/components/Reveal";
import { ProjectCode } from "@/components/ProjectCode";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";

const filters = [
  "All",
  "Featured",
  "FastAPI",
  "Next.js",
  "React",
  "Python",
] as const;

type Filter = (typeof filters)[number];

function RowTitle({ project }: { project: Project }) {
  const title = (
    <h3 className="index-title font-display text-[clamp(1.7rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
      {project.title}
    </h3>
  );
  // Featured titles already carry this name in the showcase; names must be unique per page.
  return project.featured ? (
    title
  ) : (
    <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
      {title}
    </ViewTransition>
  );
}

/**
 * Index of every project with the original filters. On desktop a preview of
 * the hovered project follows the cursor; rows are plain links, so keyboard
 * and touch users lose nothing.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const previewX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const previewY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    if (filter === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) =>
      p.tech.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
    );
  }, [filter]);

  function onPointerMove(event: React.PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse") return;
    // Keep the 20rem preview inside the viewport.
    x.set(Math.min(event.clientX, window.innerWidth - 360));
    y.set(Math.min(Math.max(event.clientY, 140), window.innerHeight - 140));
  }

  return (
    <section id="index" className="relative py-24 md:py-36">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Index"
            title="Projects & stacks"
            description="Frontend products and backend APIs—each project listed the same way. Screens live in the gallery below."
            titleClassName="text-[clamp(2.4rem,5vw,4.5rem)]"
          />
          <Reveal delayMs={150} y={12} className="lg:col-span-5 lg:justify-self-end">
            <div
              role="group"
              aria-label="Filter projects by technology"
              className="nav-pill flex flex-wrap gap-0.5 rounded-[1.4rem] p-1 sm:rounded-full"
            >
              {filters.map((item) => {
                const isActive = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    aria-pressed={isActive}
                    className={`filter-chip ${isActive ? "is-active" : ""}`}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="filter-active"
                        className="absolute inset-0 rounded-full bg-[var(--btn-bg)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative">{item}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {`${visible.length} ${visible.length === 1 ? "project" : "projects"} shown`}
        </p>

        <ul
          className="relative mt-14 border-t border-line"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <m.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="border-b border-line"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHovered(project.slug);
                }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="index-row group"
                >
                  <span className="font-mono text-xs text-ink-subtle md:pt-2">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                  <span className="block min-w-0">
                    <RowTitle project={project} />
                    <span className="section-eyebrow mt-3 block">{project.subtitle}</span>
                  </span>
                  <span className="index-detail">
                    <span className="block text-[0.95rem] leading-relaxed text-ink-muted">
                      {project.description}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-ink-muted">
                      <span className="text-ink">Role — </span>
                      {project.role}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="index-meta">
                    <span className="font-mono text-xs text-ink-subtle">{project.year}</span>
                    <span className="index-arrow" aria-hidden>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <m.div
        className="index-preview"
        style={{ x: previewX, y: previewY }}
        data-active={hovered !== null}
        aria-hidden
      >
        {projects.map((project) => {
          const cover = project.images?.[0];
          return (
            <div
              key={project.slug}
              className="index-preview-item"
              data-show={hovered === project.slug}
            >
              {cover ? (
                <Image
                  src={cover.src}
                  alt=""
                  width={cover.width}
                  height={cover.height}
                  sizes="320px"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-bg-elevated p-4">
                  <ProjectCode project={project} className="w-full" />
                </div>
              )}
            </div>
          );
        })}
      </m.div>
    </section>
  );
}
