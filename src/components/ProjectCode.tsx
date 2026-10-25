import type { Project } from "@/data/projects";

/** Code-style cover for projects without screenshots, built only from the project's own data. */
export function ProjectCode({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-card shadow-[var(--shadow-shot)] ${className}`}
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="ml-2 truncate font-mono text-[0.62rem] text-ink-subtle">
          {project.slug}.py
        </span>
      </div>
      <pre className="overflow-hidden px-4 py-3 font-mono text-[0.62rem] leading-[1.55] text-ink sm:text-[0.74rem] sm:leading-[1.7]">
        <code>
          <span className="code-comment block"># {project.subtitle}</span>
          <span className="block">
            project = <span className="code-str">&quot;{project.title}&quot;</span>
          </span>
          <span className="block">stack = [</span>
          {project.tech.map((tech) => (
            <span key={tech} className="block">
              {"    "}
              <span className="code-str">&quot;{tech}&quot;</span>,
            </span>
          ))}
          <span className="block">]</span>
        </code>
      </pre>
    </div>
  );
}
