import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Magnetic } from "@/components/Magnetic";
import { ProjectStage } from "@/components/ProjectStage";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ScrollMaskImage } from "@/components/ScrollMaskImage";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    // The root layout's title template appends the site name.
    title: project.title,
    description: project.description,
  };
}

const pageTransition = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

const pad = (value: number) => String(value).padStart(2, "0");

/** CSS custom property for staggered entrance delays (ms). */
const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const number = pad(projects.indexOf(project) + 1);
  const more = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const images = project.images ?? [];

  const story = [
    { label: "Problem", text: project.problem },
    { label: "My role", text: project.role },
    { label: "Outcome", text: project.outcome },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgress />
      <Header solid />
      <ViewTransition enter={pageTransition} exit={pageTransition} default="none">
        <div className="curtain">
          <main className="curtain-main">
            <section id="top" className="case-hero relative pt-28 md:pt-36">
              <div className="case-hero-light" aria-hidden />
              <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
                <div className="hero-rise flex items-center justify-between gap-4" style={delay(0)}>
                  <Magnetic max={8}>
                    <Link
                      href="/#work"
                      transitionTypes={["nav-back"]}
                      className="btn btn-ghost btn-sm"
                    >
                      <ArrowLeftIcon size={14} />
                      All work
                    </Link>
                  </Magnetic>
                  <p className="font-mono text-xs text-ink-subtle">
                    {number} / {pad(projects.length)}
                  </p>
                </div>

                <p
                  className="hero-rise section-eyebrow mt-14 flex flex-wrap items-center gap-3"
                  style={delay(80)}
                >
                  <span className="text-ink-subtle">{number}</span>
                  <span className="eyebrow-line" aria-hidden />
                  <span>{project.subtitle}</span>
                </p>

                <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
                  <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,10vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-ink">
                    {project.title}
                  </h1>
                </ViewTransition>

                <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-12">
                  <p
                    className="hero-rise text-lg leading-relaxed text-ink-muted md:text-xl lg:col-span-6"
                    style={delay(260)}
                  >
                    {project.description}
                  </p>
                  <dl
                    className="hero-rise grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:col-start-8"
                    style={delay(340)}
                  >
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-subtle">
                        Year
                      </dt>
                      <dd className="mt-2 text-ink">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-subtle">
                        Type
                      </dt>
                      <dd className="mt-2 text-ink">{project.subtitle}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-subtle">
                        Stack
                      </dt>
                      <dd className="mt-3">
                        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                          {project.tech.map((tech) => (
                            <li key={tech} className="tag">
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {project.liveUrl || project.gitlabUrl ? (
                      <div className="flex flex-wrap gap-3 sm:col-span-2">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            Live demo
                            <ArrowUpRightIcon className="btn-icon" size={13} />
                          </a>
                        ) : null}
                        {project.gitlabUrl ? (
                          <a
                            href={project.gitlabUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm"
                          >
                            Source code
                            <ArrowUpRightIcon className="btn-icon" size={13} />
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </dl>
                </div>
              </div>
            </section>

            <section aria-label={`${project.title} overview visual`} className="pt-14 md:pt-20">
              <div className="mx-auto max-w-[90rem] px-5 md:px-10">
                {/* Morphs from the showcase panel; no CSS entrance so the morph lands cleanly. */}
                <ViewTransition name={`project-media-${project.slug}`} share="morph" default="none">
                  <div className="aspect-[4/3] md:aspect-[16/9]">
                    <ProjectStage
                      project={project}
                      sizes="(min-width: 1440px) 900px, 70vw"
                      preload
                      className="h-full"
                    />
                  </div>
                </ViewTransition>
              </div>
            </section>

            <section className="relative py-24 md:py-36">
              <div className="mx-auto grid max-w-[90rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <SectionHeading
                      eyebrow="Case study"
                      title="Overview"
                      titleClassName="text-[clamp(2.4rem,4.6vw,4.25rem)]"
                    />
                  </div>
                </div>
                <ol className="lg:col-span-8">
                  {story.map((item, index) => (
                    <li key={item.label} className="border-t border-line py-10 first:pt-0 first:border-t-0 md:py-14">
                      <Reveal className="grid gap-6 md:grid-cols-[6rem_minmax(0,1fr)]">
                        <span className="case-number" aria-hidden>
                          {pad(index + 1)}
                        </span>
                        <div>
                          <h2 className="section-eyebrow">{item.label}</h2>
                          <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                            {item.text}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {images.length > 0 ? (
              <section aria-label={`${project.title} screens`} className="pb-24 md:pb-36">
                <div className="mx-auto grid max-w-[90rem] gap-16 px-5 md:gap-24 md:px-10">
                  {images.map((image) => (
                    <figure
                      key={image.src}
                      className="mx-auto w-full"
                      style={{ maxWidth: Math.round(image.width * 1.1) }}
                    >
                      <ScrollMaskImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes={`(min-width: ${Math.round(image.width * 1.1)}px) ${Math.round(image.width * 1.1)}px, 92vw`}
                      />
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="relative pb-24 md:pb-36">
              <div className="mx-auto max-w-[90rem] px-5 md:px-10">
                <SectionHeading
                  eyebrow={project.title}
                  title="Highlights"
                  titleClassName="text-[clamp(2.4rem,4.6vw,4.25rem)]"
                />
                <RevealGroup as="ol" className="mt-12 border-t border-line">
                  {project.highlights.map((item, index) => (
                    <RevealItem
                      as="li"
                      key={item}
                      className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-line py-6 md:grid-cols-[5rem_minmax(0,1fr)] md:py-8"
                    >
                      <span className="pt-1 font-mono text-xs text-accent">{pad(index + 1)}</span>
                      <span className="font-display text-[clamp(1.2rem,2vw,1.7rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                        {item}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>

            <section className="relative py-24 md:py-32">
              <div className="hairline absolute inset-x-0 top-0" aria-hidden />
              <div className="mx-auto max-w-[90rem] px-5 md:px-10">
                <SectionHeading
                  eyebrow="Keep exploring"
                  title="More work"
                  titleClassName="text-[clamp(2.4rem,4.6vw,4.25rem)]"
                />
                <ul className="mt-12 border-t border-line">
                  {more.map((item) => (
                    <li key={item.slug} className="border-b border-line">
                      <Link
                        href={`/work/${item.slug}`}
                        transitionTypes={["nav-forward"]}
                        className="index-row group"
                      >
                        <span className="font-mono text-xs text-ink-subtle md:pt-2">
                          {pad(projects.indexOf(item) + 1)}
                        </span>
                        <span className="block min-w-0">
                          <ViewTransition name={`project-title-${item.slug}`} share="morph" default="none">
                            <h3 className="index-title font-display text-[clamp(1.7rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
                              {item.title}
                            </h3>
                          </ViewTransition>
                          <span className="section-eyebrow mt-3 block">{item.subtitle}</span>
                        </span>
                        <span className="index-detail">
                          <span className="block text-[0.95rem] leading-relaxed text-ink-muted">
                            {item.description}
                          </span>
                        </span>
                        <span className="index-meta">
                          <span className="font-mono text-xs text-ink-subtle">{item.year}</span>
                          <span className="index-arrow" aria-hidden>
                            <ArrowRightIcon />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </ViewTransition>
    </div>
  );
}
