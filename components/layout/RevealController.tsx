"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * One controller drives every scroll entrance on the page.
 *
 * Why this shape: sections mark elements with `data-reveal` in server-rendered
 * markup, and this single Client Component animates them. That keeps all eleven
 * sections as Server Components — no `"use client"` leaking down the tree just
 * to fade a heading in.
 *
 * `ScrollTrigger.batch` groups everything entering the viewport in the same
 * frame and staggers it, which is what makes the page feel like one continuous
 * motion rather than each element popping independently.
 *
 * Safety: the CSS that hides `[data-reveal]` is scoped to `.reveal-ready`, and
 * that class is added *here*. If this component never runs — JS disabled, a
 * bundle error, reduced motion — nothing is ever hidden.
 */
export function RevealController() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = document.documentElement;
    const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (elements.length === 0) return;

    root.classList.add("reveal-ready");
    gsap.set(elements, { opacity: 0, y: 26 });

    const batch = ScrollTrigger.batch(elements, {
      start: "top 88%",
      once: true,
      onEnter: (targets) =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASE,
          stagger: 0.07,
          force3D: true,
          overwrite: true,
          onComplete() {
            // Drop the compositor hint once the element has landed; leaving
            // will-change on hundreds of nodes costs memory for nothing.
            (this.targets() as HTMLElement[]).forEach((el) => {
              el.style.willChange = "auto";
            });
          },
        }),
    });

    /**
     * Backstop. If a ScrollTrigger never fires — a mis-measured layout after a
     * late font swap, an element already past the trigger point on load — the
     * content would stay invisible. The previous build used the same guard for
     * the same reason.
     */
    const failsafe = window.setTimeout(() => {
      gsap.to(
        elements.filter((el) => Number(getComputedStyle(el).opacity) < 1),
        { opacity: 1, y: 0, duration: 0.3, overwrite: true },
      );
    }, 3000);

    // Fonts change metrics, which changes where every trigger point sits.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(failsafe);
      batch.forEach((trigger) => trigger.kill());
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
