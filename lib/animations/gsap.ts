"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * One registration point for the whole app. Registering the same plugin from
 * several modules is harmless but makes it hard to see what is actually in use,
 * and it is how duplicate ScrollTrigger instances creep in.
 *
 * SplitText is registered inside the React Bits component that needs it — it is
 * the only consumer, and keeping it there means the plugin is not pulled into
 * the bundle for pages that never split text.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Shared timing so every section moves with the same hand. */
export const EASE = "power3.out";
export const DURATION = 0.85;
export const STAGGER = 0.075;

/**
 * Standard entrance: rise and fade, fired once when the block enters view.
 * Returns a cleanup-safe tween; `useGSAP` handles reverting it.
 */
export function revealFrom(
  targets: gsap.TweenTarget,
  options: { delay?: number; y?: number; stagger?: number; trigger?: Element | null } = {},
): gsap.core.Tween {
  const { delay = 0, y = 28, stagger = STAGGER, trigger } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: DURATION,
      ease: EASE,
      delay,
      stagger,
      // force3D keeps the transform on the compositor rather than triggering
      // layout on every frame.
      force3D: true,
      scrollTrigger: trigger
        ? { trigger, start: "top 85%", once: true, fastScrollEnd: true }
        : undefined,
    },
  );
}
