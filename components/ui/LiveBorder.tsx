"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Loaded on demand rather than statically: ElectricBorder carries a
 * self-contained noise/geometry implementation, it sits well below the fold,
 * and reduced-motion users never need it at all. Keeping it out of the initial
 * bundle costs nothing, since the card renders unbordered until it scrolls near
 * the viewport anyway.
 */
const ElectricBorder = dynamic(() => import("@/components/reactbits/ElectricBorder"), {
  ssr: false,
});

interface LiveBorderProps {
  children: ReactNode;
  className?: string;
}

/**
 * An animated accent border, reserved for the one project that is actually
 * running in production. The effect means something here — it is the visual
 * form of "this is live" — which is the bar every effect on this page has to
 * clear.
 *
 * ElectricBorder drives a permanent canvas rAF loop, so it is mounted only
 * while the card is on screen and never at all under reduced motion. Without
 * that gate it would burn a frame budget on a card sitting three screens away.
 */
export function LiveBorder({ children, className }: LiveBorderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const host = hostRef.current;
    if (!host) return;

    // Latch on first sight and never switch back. Toggling with visibility
    // would remount the whole card every time it left and re-entered the
    // viewport — wasteful, and each remount restarts its subtree from scratch.
    // One mount is the cost; the saving that matters (keeping ElectricBorder
    // out of the initial bundle and idle until needed) is already banked.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsActive(true);
        observer.disconnect();
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {isActive ? (
        <ElectricBorder color="#4ade9b" speed={0.6} chaos={0.35} borderRadius={18}>
          {children}
        </ElectricBorder>
      ) : (
        children
      )}
    </div>
  );
}
