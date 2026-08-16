"use client";

import type { ReactNode } from "react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The house card. React Bits' SpotlightCard supplies the pointer-tracked
 * highlight; the surface, border and radius come from this project's tokens
 * (the upstream component's hardcoded neutral palette was stripped out).
 *
 * The highlight is accent-tinted and low-opacity on purpose — at the upstream
 * default of white/0.25 it reads as a glossy SaaS card rather than an
 * instrument panel.
 */
export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(74, 222, 155, 0.10)"
      className={cn("surface-card h-full", className)}
    >
      {children}
    </SpotlightCard>
  );
}
