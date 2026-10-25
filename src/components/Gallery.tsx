import Link from "next/link";
import { galleryItems } from "@/data/gallery";
import { Reveal } from "@/components/Reveal";
import { ScrollMaskImage } from "@/components/ScrollMaskImage";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";

// Editorial placement for each screen, in data order; extra items fall back to half width.
const LAYOUT = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-6 md:col-start-7 md:mt-48",
  "md:col-span-7 md:col-start-2",
  "md:col-span-5 md:col-start-8 md:-mt-24",
  "md:col-span-10 md:col-start-2",
  "md:col-span-6 md:col-start-4",
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-36">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            index="02"
            eyebrow="Screens"
            title="Product visuals"
            titleClassName="text-[clamp(2.6rem,5.6vw,5.25rem)]"
          />
          <Reveal delayMs={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.02rem] leading-relaxed text-ink-muted">
              UI and product shots from selected work. Backend-only projects stay in the
              list above as text case studies.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-y-20 md:mt-28 md:grid-cols-12 md:gap-x-8 md:gap-y-32">
          {galleryItems.map((item, index) => (
            <li key={item.src} className={LAYOUT[index] ?? "md:col-span-6"}>
              <Link
                href={`/work/${item.projectSlug}`}
                transitionTypes={["nav-forward"]}
                className="group block"
                data-cursor="Open"
              >
                {/* Cap at ~1.25× native width so small screenshots stay sharp. */}
                <div style={{ maxWidth: Math.round(item.width * 1.25) }}>
                  <ScrollMaskImage
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes={`(min-width: 768px) ${Math.round(item.width * 1.25)}px, 92vw`}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-ink-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-2xl">
                        {item.projectTitle}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">{item.label}</p>
                    </div>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-subtle transition-colors duration-300 group-hover:text-ink">
                    View
                    <ArrowUpRightIcon
                      size={12}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
