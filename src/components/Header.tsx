"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, type Variants } from "motion/react";
import { site } from "@/data/site";
import { SECTIONS as links, useActiveSection } from "@/lib/useActiveSection";
import { useTheme } from "@/components/ThemeProvider";
import { EASE_OUT } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ArrowRightIcon, MoonIcon, SunIcon } from "@/components/icons";

const initials = site.name
  .split(" ")
  .map((part) => part[0])
  .join("");

const menuList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

type HeaderProps = {
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const themeLabel = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 ${
        solid || scrolled || open ? "is-scrolled" : ""
      }`}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <Link
          href="/#top"
          className="group flex items-center gap-3 rounded-full"
          onClick={() => setOpen(false)}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-card font-display text-[0.8rem] font-bold tracking-tight text-ink transition-transform duration-500 ease-out-expo group-hover:-rotate-6"
            aria-hidden
          >
            <span className="text-gradient">{initials}</span>
          </span>
          <span className="font-display text-[1rem] font-bold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="nav-pill flex items-center gap-0.5 rounded-full p-1">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-300 lg:px-4 ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-line-strong bg-surface-strong"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={themeLabel}
            title={themeLabel}
          >
            <MoonIcon className="theme-icon-moon" />
            <SunIcon className="theme-icon-sun" />
          </button>
          <Magnetic className="hidden lg:inline-flex" max={8}>
            <Link href="/#contact" className="btn btn-primary btn-sm">
              Let&apos;s talk
              <ArrowRightIcon className="btn-icon" size={14} />
            </Link>
          </Magnetic>
          <button
            ref={menuButton}
            type="button"
            className="icon-btn md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] h-[1.5px] w-4 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-nav"
            id="mobile-nav"
            className="h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-line bg-bg/90 px-5 pb-10 pt-8 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <nav aria-label="Mobile">
              <m.ul
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={menuList}
              >
                {links.map((link, index) => (
                  <m.li key={link.id} variants={menuItem} className="border-b border-line">
                    <Link
                      href={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 font-display text-3xl font-semibold tracking-tight text-ink"
                    >
                      {link.label}
                      <span className="font-mono text-xs text-ink-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </m.li>
                ))}
              </m.ul>
              <m.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <a href={`mailto:${site.email}`} className="btn btn-primary w-full">
                  {site.email}
                </a>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
