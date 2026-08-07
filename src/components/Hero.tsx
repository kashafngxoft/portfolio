import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden atmosphere"
    >
      <div className="pointer-events-none absolute inset-0 grid-plane" aria-hidden />

      <div
        className="pointer-events-none absolute inset-y-[18%] right-0 hidden w-[42%] md:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-l from-[color-mix(in_srgb,var(--accent)_10%,transparent)] via-transparent to-transparent" />
        <pre className="absolute inset-y-0 right-8 max-w-sm overflow-hidden font-mono text-[11px] leading-6 text-ink/18 lg:text-xs">
{`@app.post("/api/features")
async def ship(feature: Feature):
    plan = clarify(feature)
    api = design_contract(plan)
    ui = integrate_react(api)
    return deploy(ui, api)

# FastAPI · React · Next.js · Python
# Shopenzi · Amspensan · Rench · Earth Day`}
        </pre>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 md:px-8 md:pb-28">
        <p className="animate-rise section-eyebrow">{site.role}</p>
        <h1 className="animate-rise delay-1 mt-5 max-w-[12ch] font-display text-[3.4rem] leading-[0.92] font-bold tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {site.name}
        </h1>
        <p className="animate-rise delay-2 mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-muted md:text-lg">
          {site.tagline}
        </p>
        <div className="animate-rise delay-3 mt-12 flex flex-wrap items-center gap-6">
          <a href="#work" className="btn-primary">
            View work
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
