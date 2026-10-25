"use client";

import { m, useMotionValue, useSpring } from "motion/react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** Fraction of the pointer offset applied as movement. */
  strength?: number;
  /** Hard cap on travel in px so the effect stays subtle. */
  max?: number;
};

/**
 * Pulls its child gently toward a mouse pointer. Touch, pen and
 * reduced-motion users get a static element.
 */
export function Magnetic({ children, className = "", strength = 0.28, max = 10 }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 });

  function onPointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
