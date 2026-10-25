"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { m, useMotionValue, useSpring } from "motion/react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

type Mode = "default" | "link" | "label" | "text";

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that grows over
 * links and shows a label over elements marked with data-cursor="...".
 * Never rendered for touch, pen, or reduced-motion users.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor ?? "");
      } else if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setMode("text");
      } else if (target.closest("a, button, [role='button'], label, summary")) {
        setMode("link");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="cursor"
      data-mode={mode}
      data-visible={visible}
      data-pressed={pressed}
      aria-hidden
    >
      <m.div className="cursor-ring" style={{ x: ringX, y: ringY }}>
        <span className="cursor-label">{mode === "label" ? label : ""}</span>
      </m.div>
      <m.div className="cursor-dot" style={{ x, y }} />
    </div>
  );
}
