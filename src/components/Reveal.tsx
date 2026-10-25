"use client";

import { m, type Variants } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -60px 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  /** Distance in px the element travels while fading in. */
  y?: number;
};

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delayMs = 0, y = 24 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: delayMs / 1000 }}
    >
      {children}
    </m.div>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  stagger?: number;
  delayMs?: number;
};

/** Reveals its RevealItem children one after another. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delayMs = 0,
}: RevealGroupProps) {
  const props = {
    className,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.1 },
    variants: groupVariants(stagger, delayMs / 1000),
  } as const;

  if (as === "ul") return <m.ul {...props}>{children}</m.ul>;
  if (as === "ol") return <m.ol {...props}>{children}</m.ol>;
  return <m.div {...props}>{children}</m.div>;
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  if (as === "li") {
    return (
      <m.li className={className} variants={itemVariants}>
        {children}
      </m.li>
    );
  }
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}
