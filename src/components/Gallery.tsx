"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/data/gallery";
import { Reveal } from "@/components/Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-line py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="max-w-xl">
            <p className="section-eyebrow">Screens</p>
            <h2 className="section-title text-3xl md:text-[2.75rem]">
              Product visuals
            </h2>
            <p className="mt-5 text-ink-muted">
              UI and product shots from selected work. Backend-only projects stay
              in the list above as text case studies.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 sm:columns-2">
          {galleryItems.map((item, index) => (
            <Reveal key={item.src} delayMs={index * 50} className="mb-6 break-inside-avoid">
              <Link href={`/work/${item.projectSlug}`} className="group block">
                <div className="project-media overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="section-eyebrow">{item.label}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {item.projectTitle}
                    </h3>
                  </div>
                  <span className="shrink-0 font-mono text-[0.65rem] tracking-wide text-ink/40 uppercase">
                    View →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
