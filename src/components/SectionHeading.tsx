"use client";

import { Fragment } from "react";
import { m, type Variants } from "motion/react";
import { EASE_OUT } from "@/components/Reveal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + headline whose words slide up out of a mask; last word gets the gradient. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  className,
  titleClassName = "text-4xl sm:text-5xl md:text-6xl",
}: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      <m.p className="section-eyebrow flex items-center gap-3" variants={fade}>
        {index ? <span className="text-ink-subtle">{index}</span> : null}
        {index ? <span className="eyebrow-line" aria-hidden /> : null}
        <span>{eyebrow}</span>
      </m.p>
      <Heading className={`section-title ${titleClassName}`}>
        {words.map((text, i) => (
          <Fragment key={`${text}-${i}`}>
            <span className="word-mask">
              <m.span
                className={`inline-block ${i === words.length - 1 ? "text-gradient" : ""}`}
                variants={word}
              >
                {text}
              </m.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Heading>
      {description ? (
        <m.p
          className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-muted md:text-lg"
          variants={fade}
        >
          {description}
        </m.p>
      ) : null}
    </m.div>
  );
}
