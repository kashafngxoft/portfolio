"use client";

import { FormEvent, useEffect, useState } from "react";
import { site } from "@/data/site";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitLabIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the mailto button beside it still works.
    }
  }

  // Light follows the pointer across the section (CSS variables, no re-render).
  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--cy", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="contact"
      className="contact relative overflow-hidden py-24 md:py-36"
      onPointerMove={onPointerMove}
    >
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="contact-light" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Let's build something useful"
          titleClassName="max-w-[12ch] text-[clamp(3rem,9.2vw,9.5rem)] leading-[0.92]"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">
              Open to opportunities and collaborations. Email, LinkedIn, GitLab—or a short note.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${site.email}`} className="btn btn-primary">
                  <MailIcon />
                  {site.email}
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="icon-btn"
                aria-label={copied ? "Email address copied" : "Copy email address"}
                title={copied ? "Copied" : "Copy email address"}
              >
                {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Magnetic max={8}>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <LinkedInIcon size={14} />
                  LinkedIn
                  <ArrowUpRightIcon className="btn-icon" size={13} />
                </a>
              </Magnetic>
              <Magnetic max={8}>
                <a
                  href={site.links.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <GitLabIcon size={14} />
                  GitLab
                  <ArrowUpRightIcon className="btn-icon" size={13} />
                </a>
              </Magnetic>
            </div>

            <p className="mt-10 flex items-center gap-2 text-sm text-ink-subtle">
              <MapPinIcon size={14} />
              {site.location}
            </p>
          </Reveal>

          <Reveal delayMs={120} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={onSubmit} className="glass rounded-[1.75rem] p-6 md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink-muted">
                  Name
                  <input required name="name" autoComplete="name" className="field" />
                </label>
                <label className="block text-sm font-medium text-ink-muted">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="field"
                  />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-ink-muted">
                Message
                <textarea required name="message" rows={5} className="field resize-y" />
              </label>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <Magnetic>
                  <button type="submit" className="btn btn-primary">
                    Send message
                    <ArrowRightIcon className="btn-icon" />
                  </button>
                </Magnetic>
                <p className="text-sm text-ink-muted" aria-live="polite">
                  {status === "sent" ? "Opening your email app…" : ""}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
