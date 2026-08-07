import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
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
    title: `${project.title} — Kashaf Noor`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgress />
      <Header solid />
      <main className="pt-20">
        <section className="border-b border-line atmosphere">
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
            <Link href="/#work" className="btn-ghost text-[0.75rem]">
              ← All work
            </Link>
            <p className="section-eyebrow mt-10">{project.subtitle}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.035em] text-ink md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {project.description}
            </p>
            <p className="mt-8 font-mono text-[0.68rem] tracking-[0.1em] text-ink/45 uppercase">
              {project.tech.join(" · ")}
            </p>
          </div>
        </section>

        {project.images && project.images.length > 0 ? (
          <section className="border-b border-line bg-bg-elevated py-14 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 md:px-8">
              {project.images.map((image, index) => (
                <div key={image.src} className="project-media overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1400}
                    height={900}
                    className="h-auto w-full"
                    priority={index === 0}
                    unoptimized={image.src.endsWith(".svg")}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-3 md:gap-12 md:px-8">
            <div>
              <h2 className="section-eyebrow">Problem</h2>
              <p className="mt-4 text-ink-muted">{project.problem}</p>
            </div>
            <div>
              <h2 className="section-eyebrow">My role</h2>
              <p className="mt-4 text-ink-muted">{project.role}</p>
            </div>
            <div>
              <h2 className="section-eyebrow">Outcome</h2>
              <p className="mt-4 text-ink-muted">{project.outcome}</p>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-6xl px-6 md:px-8">
            <h2 className="section-title text-2xl md:text-3xl">Highlights</h2>
            <ul className="mt-8 grid gap-px bg-line md:grid-cols-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 bg-bg-elevated px-5 py-5 text-ink-muted"
                >
                  <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line bg-bg-elevated py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <h2 className="section-title text-2xl md:text-3xl">More work</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {more.map((item) => (
                <Link key={item.slug} href={`/work/${item.slug}`} className="group block">
                  <p className="section-eyebrow">{item.subtitle}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
