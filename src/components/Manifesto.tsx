"use client";

import { Fragment, useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/data/site";

const ACCENTS = new Set(["FastAPI", "React", "Next.js", "TensorFlow", "scikit-learn"]);

function Word({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = ACCENTS.has(text.replace(/[.,()]/g, ""));
  return (
    <m.span className="manifesto-word" style={{ opacity }}>
      {accent ? <span className="text-gradient">{text}</span> : text}
    </m.span>
  );
}

/**
 * Pinned statement whose words light up with scroll. The sculpture from the
 * hero stays pinned behind it, dimmed, so the two scenes read as one.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end end"] });
  const words = site.about.split(" ");
  const span = 0.8 / words.length;

  return (
    <section id="intro" ref={ref} aria-label="Introduction" className="manifesto relative">
      <div className="manifesto-pin">
        <div className="relative mx-auto w-full max-w-[90rem] px-5 md:px-10">
          <p className="section-eyebrow flex items-center gap-3">
            <span className="eyebrow-line" aria-hidden />
            In short
          </p>
          <p className="manifesto-text mt-8 max-w-[22ch] font-display font-semibold text-ink sm:max-w-[26ch] lg:max-w-[30ch]">
            {words.map((word, index) => {
              const start = 0.05 + index * span;
              return (
                <Fragment key={`${word}-${index}`}>
                  <Word text={word} progress={scrollYProgress} range={[start, start + span * 3]} />
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
