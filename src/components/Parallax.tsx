"use client";

import { m, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children?: React.ReactNode;
  className?: string;
  /** Horizontal travel over `range` px of page scroll, with units (e.g. "-12vw"). */
  x?: string;
  /** Vertical travel over `range` px of page scroll, with units (e.g. "80px"). */
  y?: string;
  /** Fade to transparent over the same scroll range. */
  fade?: boolean;
  range?: number;
  /** Render a span when the layer sits inside phrasing content such as a heading. */
  as?: "div" | "span";
};

/**
 * Page-scroll-linked drift for hero layers. The `.parallax` class lets the
 * reduced-motion stylesheet cancel the transform.
 */
export function Parallax({
  children,
  className = "",
  x = "0px",
  y = "0px",
  fade = false,
  range = 700,
  as = "div",
}: ParallaxProps) {
  const { scrollY } = useScroll();
  const unit = (value: string) => value.replace(/^-?[\d.]+/, "");
  const tx = useTransform(scrollY, [0, range], [`0${unit(x)}`, x]);
  const ty = useTransform(scrollY, [0, range], [`0${unit(y)}`, y]);
  const opacity = useTransform(scrollY, [0, range * 0.8], [1, fade ? 0 : 1]);
  const props = { className: `parallax ${className}`, style: { x: tx, y: ty, opacity } };

  return as === "span" ? <m.span {...props}>{children}</m.span> : <m.div {...props}>{children}</m.div>;
}
