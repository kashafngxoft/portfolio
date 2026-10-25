"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectCode } from "@/components/ProjectCode";

type ProjectStageProps = {
  project: Project;
  sizes: string;
  /** Preload the lead screenshot (case-study hero). */
  preload?: boolean;
  /** Skip lazy loading, e.g. inside the horizontal showcase where panels slide in fast. */
  eager?: boolean;
  className?: string;
};

// Back layers of a multi-screen stack: position plus parallax depth.
const STACK = [
  { className: "left-[5%] top-[9%] w-[56%] opacity-60", depth: 0.6 },
  { className: "right-[5%] top-[15%] w-[56%] opacity-80", depth: 0.9 },
];

/**
 * Composition of a project's real screenshots on a lit stage. Pointer
 * position tilts the scene and shifts each layer by its depth (CSS only,
 * no React state), so it reads as physical space.
 */
export function ProjectStage({
  project,
  sizes,
  preload = false,
  eager = false,
  className = "",
}: ProjectStageProps) {
  const images = project.images ?? [];
  const [lead, ...others] = images;
  const loading = eager && !preload ? "eager" : undefined;

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ry = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    event.currentTarget.style.setProperty("--rx", rx.toFixed(3));
    event.currentTarget.style.setProperty("--ry", ry.toFixed(3));
  }

  function onPointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--rx", "0");
    event.currentTarget.style.setProperty("--ry", "0");
  }

  return (
    <div
      className={`stage-frame ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="stage-frame-grid" aria-hidden />
      <div className="stage-frame-glow" aria-hidden />
      <div className="stage-scene">
        {!lead ? (
          <div className="stage-layer-depth absolute inset-0 flex items-center justify-center p-[9%]" style={{ "--depth": 1 } as React.CSSProperties}>
            <ProjectCode project={project} className="w-full max-w-[24rem]" />
          </div>
        ) : others.length === 0 ? (
          <div className="stage-layer-depth absolute inset-0 flex items-center justify-center p-[9%]" style={{ "--depth": 1 } as React.CSSProperties}>
            <Image
              src={lead.src}
              alt={lead.alt}
              width={lead.width}
              height={lead.height}
              sizes={sizes}
              loading={loading}
              preload={preload}
              className="shot h-auto max-h-full w-auto max-w-full"
            />
          </div>
        ) : (
          <>
            {others.slice(0, STACK.length).map((image, index) => (
              <div
                key={image.src}
                className={`stage-layer-depth absolute ${STACK[index].className}`}
                style={{ "--depth": STACK[index].depth } as React.CSSProperties}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={sizes}
                  loading={loading}
                  className="shot h-auto w-full"
                />
              </div>
            ))}
            <div
              className="stage-layer-depth absolute bottom-[8%] left-[14%] w-[72%]"
              style={{ "--depth": 1.6 } as React.CSSProperties}
            >
              <Image
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                sizes={sizes}
                loading={loading}
                preload={preload}
                className="shot h-auto w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
