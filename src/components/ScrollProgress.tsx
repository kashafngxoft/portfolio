"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

type Tick = { id: string; at: number };

/**
 * Scroll progress: a thin top bar on smaller screens and, from 1280px, a
 * vertical rail marking where each section starts and which one is current.
 * Purely visual; the header nav is the accessible navigation.
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [ticks, setTicks] = useState<Tick[]>([]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  useEffect(() => {
    if (!isHome) return;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setTicks(
        SECTIONS.flatMap(({ id }) => {
          const node = document.getElementById(id);
          if (!node) return [];
          const top = node.getBoundingClientRect().top + window.scrollY;
          return [{ id, at: Math.min(Math.max(top / max, 0), 1) }];
        }),
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isHome]);

  const index = active ? SECTIONS.findIndex((section) => section.id === active) : -1;

  return (
    <>
      <m.div className="progress-bar xl:hidden" style={{ scaleX: progress }} aria-hidden />
      <div className="progress-rail" aria-hidden>
        <span className="font-mono text-[0.62rem] tabular-nums text-ink-subtle">
          {index >= 0 ? String(index + 1).padStart(2, "0") : "00"}
        </span>
        <div className="progress-rail-track">
          <m.div className="progress-rail-fill" style={{ scaleY: progress }} />
          {isHome
            ? ticks.map((tick) => (
                <span
                  key={tick.id}
                  className={`progress-rail-tick ${tick.id === active ? "is-active" : ""}`}
                  style={{ top: `${tick.at * 100}%` }}
                />
              ))
            : null}
        </div>
        <span className="progress-rail-label">
          {index >= 0 ? SECTIONS[index].label : isHome ? "Intro" : "Case study"}
        </span>
      </div>
    </>
  );
}
