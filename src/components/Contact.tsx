"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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

  return (
    <section id="contact" className="border-t border-line py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1fr_1fr] md:gap-24 md:px-8">
        <Reveal>
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title max-w-md text-3xl md:text-[2.75rem]">
            Let&apos;s build something useful
          </h2>
          <p className="mt-6 max-w-sm text-ink-muted">
            Open to opportunities and collaborations. Email, LinkedIn, GitLab—or
            a short note.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4">
            <a href={`mailto:${site.email}`} className="btn-primary">
              {site.email}
            </a>
            <div className="flex flex-wrap gap-6">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn
              </a>
              <a
                href={site.links.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitLab
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <form onSubmit={onSubmit} className="soft-panel p-7 md:p-9">
            <label className="block text-sm text-ink-muted">
              Name
              <input required name="name" className="field" />
            </label>
            <label className="mt-6 block text-sm text-ink-muted">
              Email
              <input required type="email" name="email" className="field" />
            </label>
            <label className="mt-6 block text-sm text-ink-muted">
              Message
              <textarea
                required
                name="message"
                rows={4}
                className="field resize-y"
              />
            </label>
            <button type="submit" className="btn-primary mt-8">
              Send message
            </button>
            {status === "sent" ? (
              <p className="mt-3 text-sm text-ink-muted">
                Opening your email app…
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
