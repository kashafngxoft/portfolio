"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroScene } from "@/lib/heroScene";

type Placement = { center: [number, number]; scale: number; fade: number };

/** Where the sculpture sits in the hero, and where it settles behind the manifesto. */
function placements(width: number, height: number): { hero: Placement; intro: Placement } {
  const halfAspect = (width / height) * 0.5;
  if (width >= 1024) {
    return {
      hero: { center: [halfAspect * 0.49, 0.03], scale: 0.34, fade: 1 },
      intro: { center: [halfAspect * 0.3, 0], scale: 0.46, fade: 0.38 },
    };
  }
  if (width >= 640) {
    return {
      hero: { center: [halfAspect * 0.68, 0.22], scale: 0.24, fade: 0.9 },
      intro: { center: [halfAspect * 0.2, 0], scale: 0.4, fade: 0.3 },
    };
  }
  return {
    hero: { center: [halfAspect * 0.62, 0.3], scale: 0.22, fade: 0.85 },
    intro: { center: [0, 0.06], scale: 0.36, fade: 0.26 },
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function HeroStage() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const wrap = layer?.parentElement;
    if (!layer || !canvas || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: HeroScene | null = null;
    let disposed = false;
    let raf = 0;
    let visible = true;
    let shown = false;
    let quality = window.innerWidth < 768 ? 0.7 : 1;
    let time = 2.4;
    let last = performance.now();
    let frames = 0;
    let frameTime = 0;
    const metrics = { top: 0, heroHeight: 1, wrapHeight: 1, width: 1, height: 1 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const measure = () => {
      const hero = wrap.querySelector<HTMLElement>("#top");
      metrics.top = wrap.getBoundingClientRect().top + window.scrollY;
      metrics.heroHeight = hero?.offsetHeight ?? window.innerHeight;
      metrics.wrapHeight = wrap.offsetHeight;
      metrics.width = canvas.clientWidth || window.innerWidth;
      metrics.height = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      scene?.resize(
        Math.max(1, Math.round(metrics.width * dpr * quality)),
        Math.max(1, Math.round(metrics.height * dpr * quality)),
      );
    };

    const draw = () => {
      if (!scene) return;
      const { hero, intro } = placements(metrics.width, metrics.height);
      const scrolled = window.scrollY - metrics.top;
      const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
      const progress = reduced ? 0 : smooth(clamp01(scrolled / (metrics.heroHeight * 0.9)));
      // Fade out over the last stretch so the pinned stage never leaves a cut-off slice behind.
      const exitStart = metrics.wrapHeight - metrics.height * 1.7;
      const exit = reduced ? 0 : smooth(clamp01((scrolled - exitStart) / (metrics.height * 0.55)));
      scene.render({
        time,
        pointer: [pointer.x, pointer.y],
        center: [
          lerp(hero.center[0], intro.center[0], progress),
          lerp(hero.center[1], intro.center[1], progress),
        ],
        scale: lerp(hero.scale, intro.scale, progress),
        fade: lerp(hero.fade, intro.fade, progress) * (1 - exit),
      });
      if (!shown) {
        shown = true;
        setReady(true);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (disposed || !visible) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      // Ease toward the pointer; mirror the value into CSS for the type layers.
      const px = pointer.x + (pointer.tx - pointer.x) * 0.06;
      const py = pointer.y + (pointer.ty - pointer.y) * 0.06;
      if (Math.abs(px - pointer.x) + Math.abs(py - pointer.y) > 0.0004) {
        wrap.style.setProperty("--px", px.toFixed(4));
        wrap.style.setProperty("--py", py.toFixed(4));
      }
      pointer.x = px;
      pointer.y = py;

      draw();

      // Drop resolution if the GPU cannot keep up.
      frames += 1;
      frameTime += dt;
      if (frames === 45) {
        if (frameTime / frames > 0.024 && quality > 0.45) {
          quality = Math.max(0.45, quality - 0.15);
          measure();
        }
        frames = 0;
        frameTime = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced) {
        draw();
        return;
      }
      if (!raf && visible && !disposed) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    let inView = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible" && inView;
      if (visible) start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visible = inView && document.visibilityState === "visible";
      if (visible) start();
    });

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (reduced) draw();
    });

    const themeObserver = new MutationObserver(() => {
      scene?.setTheme(document.documentElement.dataset.theme === "light");
      if (reduced) draw();
    });

    // Defer GL setup until the browser is idle so it never competes with first paint.
    const init = async () => {
      if (disposed) return;
      const { createHeroScene } = await import("@/lib/heroScene");
      if (disposed) return;
      scene = createHeroScene(canvas);
      if (!scene) return; // No WebGL: the CSS fallback stays in place.
      scene.setTheme(document.documentElement.dataset.theme === "light");
      measure();
      observer.observe(wrap);
      resizeObserver.observe(canvas);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      if (!reduced) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
      }
      start();
    };

    const hasIdle = "requestIdleCallback" in window;
    const scheduled = hasIdle
      ? window.requestIdleCallback(() => void init(), { timeout: 900 })
      : window.setTimeout(() => void init(), 120);

    return () => {
      disposed = true;
      if (hasIdle) window.cancelIdleCallback(scheduled);
      else window.clearTimeout(scheduled);
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      scene?.destroy();
    };
  }, []);

  return (
    <div ref={layerRef} className="stage-layer" aria-hidden>
      <div className="stage-sticky">
        <div className={`stage-fallback ${ready ? "is-hidden" : ""}`} />
        <canvas ref={canvasRef} className={`stage-canvas ${ready ? "is-ready" : ""}`} />
      </div>
    </div>
  );
}
