"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { getFeaturedProjects, projects, type Project } from "@/data/projects";
import { EASE_OUT } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ProjectStage } from "@/components/ProjectStage";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/icons";

const featured = getFeaturedProjects();
const pad = (value: number) => String(value).padStart(2, "0");

// Horizontal travel per px of vertical scroll; > 1 keeps the pinned run short.
const SPEED = 1.3;

function Panel({ project, onFocus }: { project: Project; onFocus: (node: HTMLElement) => void }) {
  const number = pad(projects.indexOf(project) + 1);
  const href = `/work/${project.slug}`;

  return (
    <li
      className="showcase-panel"
      onFocus={(event) => onFocus(event.currentTarget)}
    >
      <Link
        href={href}
        transitionTypes={["nav-forward"]}
        className="showcase-media block"
        tabIndex={-1}
        aria-hidden
        data-cursor="View case"
      >
        <m.div
          className="mask-reveal h-full"
          initial={{ clipPath: "inset(0% 100% 0% 0% round 28px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          <ViewTransition name={`project-media-${project.slug}`} share="morph" default="none">
            <div className="h-full">
              <ProjectStage
                project={project}
                sizes="(min-width: 1024px) 42vw, 92vw"
                eager
                className="h-full"
              />
            </div>
          </ViewTransition>
        </m.div>
      </Link>

      <div className="showcase-copy">
        <span className="showcase-number" aria-hidden>
          {number}
        </span>
        <p className="section-eyebrow">
          {project.subtitle} <span className="text-ink-subtle">· {project.year}</span>
        </p>
        <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
          <h3 className="mt-4 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
            {project.title}
          </h3>
        </ViewTransition>
        <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.tech.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <Magnetic className="mt-8">
          <Link href={href} transitionTypes={["nav-forward"]} className="btn btn-primary">
            View case study
            <ArrowRightIcon className="btn-icon" />
          </Link>
        </Magnetic>
      </div>
    </li>
  );
}

/**
 * Featured projects as a pinned horizontal sequence on large screens. Below
 * 1024px, or with reduced motion, it becomes a normal vertical list (the CSS
 * neutralises the scroll-linked transform).
 */
export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const distance = useMotionValue(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(featured.length - 1, Math.floor(progress * featured.length));
    setActive((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (!wide.matches || reduced.matches) {
        section.style.height = "";
        distance.set(0);
        return;
      }
      const travel = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(travel);
      section.style.height = `${window.innerHeight + travel / SPEED}px`;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [distance]);

  // Keyboard focus inside an off-screen panel scrolls the page to that panel.
  function revealPanel(panel: HTMLElement) {
    const section = sectionRef.current;
    const travel = distance.get();
    if (!section || travel === 0) return;
    const target = panel.offsetLeft - (window.innerWidth - panel.offsetWidth) / 2;
    const progress = Math.min(Math.max(target / travel, 0), 1);
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (progress * travel) / SPEED, behavior: "instant" });
  }

  return (
    <section id="work" ref={sectionRef} className="showcase relative">
      <div className="showcase-pin">
        <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-end justify-between gap-8 px-5 pt-24 md:px-10 lg:pt-28">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Products I've built"
            titleClassName="text-[clamp(2.6rem,5.6vw,5.25rem)]"
          />
          <div className="hidden items-center gap-4 font-mono text-xs text-ink-subtle lg:flex" aria-hidden>
            <span className="text-ink">{pad(active + 1)}</span>
            <span className="relative h-px w-40 overflow-hidden bg-line">
              <m.span
                className="absolute inset-0 origin-left bg-[image:var(--gradient-line)]"
                style={{ scaleX: scrollYProgress }}
              />
            </span>
            <span>{pad(featured.length)}</span>
          </div>
        </div>

        <div className="showcase-viewport">
          <m.ul ref={trackRef} className="showcase-track" style={{ x }}>
            {featured.map((project) => (
              <Panel key={project.slug} project={project} onFocus={revealPanel} />
            ))}
            <li className="showcase-end" onFocus={(event) => revealPanel(event.currentTarget)}>
              <p className="section-eyebrow">Index</p>
              <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                All {projects.length} projects, with stacks and roles.
              </p>
              <a href="#index" className="link-arrow mt-8">
                Browse the index
                <ArrowDownIcon className="btn-icon" size={14} />
              </a>
            </li>
          </m.ul>
        </div>
      </div>
    </section>
  );
}
