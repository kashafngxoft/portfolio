import { skillGroups } from "@/data/skills";

const skills = skillGroups.flatMap((group) => group.items);

function SkillRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {skills.map((skill) => (
        <li
          key={skill}
          className="flex items-center whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink-muted/80 md:text-2xl"
        >
          <span className="px-6 md:px-8">{skill}</span>
          <span className="text-gradient text-sm" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Slow, pausable ticker of the skill list; the second copy makes the loop seamless. */
export function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="relative py-10 md:py-14">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          <SkillRow />
          <SkillRow hidden />
        </div>
      </div>
      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
