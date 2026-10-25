"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";

type ScrollMaskImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
};

/**
 * A screenshot that opens from an inset mask as it scrolls into view, with
 * the image drifting inside the frame for depth. Reduced-motion CSS removes
 * both the mask and the drift.
 */
export function ScrollMaskImage({ src, alt, width, height, sizes, className = "" }: ScrollMaskImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.38],
    ["inset(14% 10% 14% 10% round 32px)", "inset(0% 0% 0% 0% round 20px)"],
  );
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <m.div
      ref={ref}
      className={`scroll-mask relative overflow-hidden rounded-[20px] bg-bg-elevated ${className}`}
      style={{ clipPath, aspectRatio: `${width} / ${height}` }}
    >
      {/* Slightly oversized so the drift never exposes an edge. */}
      <m.div className="scroll-mask-inner absolute inset-x-0 -inset-y-[3.5%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </m.div>
    </m.div>
  );
}
