"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#gallery", label: "Screens" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

type HeaderProps = {
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 ${
        solid || scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link
          href="/#top"
          className="font-display text-[1.05rem] font-bold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 text-[0.8125rem] text-ink-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link hover:text-ink">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[0.75rem] tracking-wide text-ink-muted transition-colors hover:text-ink"
            aria-label="Toggle color theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[0.75rem] text-ink-muted"
            aria-label="Toggle color theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            type="button"
            className="text-[0.75rem] tracking-wide text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-bg-elevated/95 px-6 py-8 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-5 text-base text-ink">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
