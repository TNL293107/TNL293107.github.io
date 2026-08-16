"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Marks an element as claimed by this controller. See globals.css. */
const ARMED = "data-reveal-armed";

/**
 * One controller drives every scroll entrance on the page.
 *
 * Why this shape: sections mark elements with `data-reveal` in server-rendered
 * markup, and this single Client Component animates them. That keeps all the
 * sections as Server Components — no `"use client"` leaking down the tree just
 * to fade a heading in.
 *
 * `ScrollTrigger.batch` groups everything entering the viewport in the same
 * frame and staggers it, which is what makes the page feel like one continuous
 * motion rather than each element popping independently.
 *
 * Safety: the CSS that hides a reveal target keys off the `data-reveal-armed`
 * attribute written here, never off `[data-reveal]` alone. So nothing is hidden
 * when JavaScript does not run, and — importantly — an element that mounts
 * later is not stranded invisible by a rule this controller no longer tracks.
 */
export function RevealController() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (elements.length === 0) return;

    const disarm = (el: HTMLElement) => {
      el.removeAttribute(ARMED);
      // Drop the compositor hint once the element has landed; leaving
      // will-change on hundreds of nodes costs memory for nothing.
      el.style.willChange = "auto";
    };

    elements.forEach((el) => el.setAttribute(ARMED, ""));
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
            (this.targets() as HTMLElement[]).forEach(disarm);
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
      const stuck = elements.filter((el) => Number(getComputedStyle(el).opacity) < 1);
      if (stuck.length === 0) return;
      gsap.to(stuck, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        overwrite: true,
        onComplete: () => stuck.forEach(disarm),
      });
    }, 3000);

    // Fonts change metrics, which changes where every trigger point sits.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(failsafe);
      batch.forEach((trigger) => trigger.kill());
      // Never leave an element armed on teardown; the CSS would hide it with
      // no controller left to reveal it.
      elements.forEach(disarm);
    };
  }, []);

  return null;
}
