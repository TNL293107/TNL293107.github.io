"use client";

import type { ReactNode } from "react";
import Magnet from "@/components/reactbits/Magnet";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Lower is subtler. The default here is deliberately weaker than upstream's. */
  strength?: number;
}

/**
 * React Bits' Magnet, gated so it only runs where it makes sense.
 *
 * On a touch device there is no hovering pointer to be attracted, and the
 * effect just adds listeners that never usefully fire — so it is disabled below
 * the fine-pointer threshold and under reduced motion. The hover behaviour is
 * decoration on top of a plain link; nothing depends on it.
 */
export function MagneticButton({
  children,
  className,
  strength = 4,
}: MagneticButtonProps) {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const isReduced = useReducedMotion();

  return (
    <Magnet
      disabled={!hasFinePointer || isReduced}
      padding={70}
      magnetStrength={strength}
      wrapperClassName={className}
      activeTransition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      inactiveTransition="transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      {children}
    </Magnet>
  );
}
