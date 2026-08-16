"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * The single global Lenis instance (§21). Nothing else in the app may construct
 * one — a second instance fights the first for the scroll position and produces
 * a stutter that is very hard to trace back.
 *
 * Responsibilities:
 *   - drive ScrollTrigger from Lenis' scroll event, so pinned/triggered
 *     animations stay in sync with the smoothed position rather than the raw one
 *   - run Lenis off the GSAP ticker, so there is one rAF loop, not two
 *   - handle in-page anchors, since native `scroll-behavior: smooth` and Lenis
 *     would otherwise both try to animate the same scroll
 *   - opt out entirely under prefers-reduced-motion, falling back to the
 *     browser's own instant jump
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    // Reduced motion: no smoothing, no rAF loop. Anchors fall through to the
    // browser's default jump, which is exactly the desired behaviour.
    if (reduced) {
      document.documentElement.style.scrollBehavior = "auto";
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have good native inertia; smoothing it a second
      // time feels laggy and breaks the expected fling behaviour.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Without this, a long frame makes GSAP "catch up" and Lenis jumps.
    gsap.ticker.lagSmoothing(0);

    // ── in-page anchors ────────────────────────────────────────────────────
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, download, etc.) behave normally.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88 });

      // Lenis moves the viewport but not focus, which would strand a keyboard
      // user at the top of the page. Move focus to the landed section without
      // letting the browser re-scroll to it.
      const focusTarget = target as HTMLElement;
      const hadTabIndex = focusTarget.hasAttribute("tabindex");
      if (!hadTabIndex) focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
      if (!hadTabIndex) {
        focusTarget.addEventListener(
          "blur",
          () => focusTarget.removeAttribute("tabindex"),
          { once: true },
        );
      }

      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
