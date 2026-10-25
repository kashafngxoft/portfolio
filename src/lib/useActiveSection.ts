import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "gallery", label: "Screens" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

// Areas that are observed but map onto a nav entry (or onto none).
const ALIASES: Record<string, SectionId | null> = {
  top: null,
  intro: null,
  index: "work",
};

const OBSERVED = ["top", "intro", ...SECTIONS.map((section) => section.id), "index"];

/** The nav section currently crossing the middle of the viewport. */
export function useActiveSection(enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const nodes = OBSERVED.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id in ALIASES ? ALIASES[id] : (id as SectionId));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}
