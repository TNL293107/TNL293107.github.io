"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, resumeUrl, site } from "@/data/site";
import { gsap } from "@/lib/animations/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function Navbar() {
  const [isCondensed, setIsCondensed] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const barRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // ── condense on scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── scroll spy ───────────────────────────────────────────────────────────
  useEffect(() => {
    const ids = navigation.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The entry closest to the top of the viewport wins, so a tall section
        // does not keep the highlight while a short one scrolls past it.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ── entrance ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;
    // First beat of the page-load sequence: navbar, then hero, then CTA.
    const tween = gsap.fromTo(
      barRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 },
    );
    return () => {
      tween.kill();
    };
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // ── mobile panel: escape, focus trap, scroll lock ────────────────────────
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, closeMenu]);

  const resumeHref = resumeUrl ?? `mailto:${site.email}?subject=Resume%20request`;
  const resumeLabel = resumeUrl ? "Resume" : "Resume";

  return (
    <>
      <header
        ref={barRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isCondensed
            ? "border-b border-border bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8",
            isCondensed ? "h-14" : "h-[4.5rem]",
          )}
        >
          {/* Wordmark. Drops to initials on very narrow screens so the bar
              still fits on one line. */}
          <a
            href="#top"
            className="group flex items-baseline gap-2 font-display text-[0.95rem] font-semibold tracking-tight"
          >
            <span className="hidden sm:inline">{site.name}</span>
            <span className="sm:hidden">{site.shortName}</span>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-faint uppercase transition-colors group-hover:text-accent">
              {site.handle}
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors duration-300",
                    isActive ? "text-accent" : "text-faint hover:text-text",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-400 ease-[var(--ease-out-expo)]",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-border px-4 py-2 font-mono text-[0.68rem] tracking-[0.1em] text-dim uppercase transition-colors duration-300 hover:border-border-strong hover:text-text sm:inline-block"
            >
              GitHub
            </a>
            <a
              href={resumeHref}
              className="rounded-full bg-accent px-4 py-2 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-accent-ink uppercase transition-opacity duration-300 hover:opacity-85"
            >
              {resumeLabel}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="rounded-full border border-border px-4 py-2 font-mono text-[0.68rem] tracking-[0.1em] text-dim uppercase transition-colors hover:text-text lg:hidden"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel. A real full-screen sheet rather than six cramped links —
          the mobile layout is reflowed, not compressed. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!isMenuOpen}
        className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-2xl lg:hidden"
      >
        <nav
          aria-label="Sections"
          className="flex h-full flex-col justify-center gap-1 px-8 pt-20 pb-16"
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-baseline gap-4 border-b border-border py-4 font-display text-2xl font-medium transition-colors hover:text-accent"
            >
              <span className="font-mono text-[0.65rem] text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 rounded-full border border-border px-5 py-3 text-center font-mono text-xs tracking-[0.1em] text-dim uppercase"
          >
            GitHub
          </a>
        </nav>
      </div>
    </>
  );
}
