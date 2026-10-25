"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {/* "user" honours prefers-reduced-motion: transforms are skipped, fades remain. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
