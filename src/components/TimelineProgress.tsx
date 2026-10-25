"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";

/** Timeline rail whose gradient fill draws down as the list scrolls through the viewport. */
export function TimelineProgress({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="timeline-track" aria-hidden />
      <m.div className="timeline-fill" style={{ scaleY }} aria-hidden />
      {children}
    </div>
  );
}
