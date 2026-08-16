"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/utils";

interface CountUpProps {
  value: number;
  className?: string;
}

/**
 * Written against GSAP rather than pulled from React Bits, whose CountUp is
 * built on `motion` — the one animation library this project deliberately does
 * not carry.
 *
 * The true value is server-rendered as the element's text, so it is correct for
 * search engines, screen readers and anyone whose JS never runs; the tween only
 * ever overwrites an already-correct number.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { current: 0 };
      const tween = gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: "power2.out",
        snap: { current: 1 },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.current));
        },
        // If the tween is interrupted, leave the real number behind.
        onInterrupt: () => {
          el.textContent = String(value);
        },
      });

      return () => {
        tween.kill();
        el.textContent = String(value);
      };
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
