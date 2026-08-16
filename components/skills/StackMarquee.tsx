"use client";

import dynamic from "next/dynamic";
import { techIcons } from "@/data/icons";
import { TechMark } from "@/components/ui/TechMark";

/**
 * LogoLoop is the largest single React Bits component here (~16KB of source:
 * ResizeObserver plumbing, a rAF transport and seamless-sequence maths). It is
 * decorative and below the fold, so it is fetched on demand rather than
 * shipped in the first-load bundle.
 */
const LogoLoop = dynamic(() => import("@/components/reactbits/LogoLoop"), {
  ssr: false,
  // Reserve the row's height so nothing shifts when the component arrives.
  loading: () => <div className="h-[26px]" />,
});

/**
 * Replaces the previous build's draggable canvas stack cloud. The cloud was a
 * showpiece but it hid the information behind an interaction; a continuous rail
 * states the same set at a glance and costs a fraction of the code.
 *
 * The marks are the same embedded Simple Icons path data as before, so this
 * still makes no network request and carries no runtime icon dependency.
 */
const MARKS = Object.keys(techIcons);

export function StackMarquee() {
  return (
    <div
      className="relative border-y border-border py-7"
      // Purely decorative: every technology here is also listed as text in the
      // filterable grid below.
      aria-hidden="true"
    >
      <LogoLoop
        logos={MARKS.map((name) => ({
          node: (
            <span className="flex items-center gap-2.5 text-faint transition-colors duration-300 hover:text-text">
              <TechMark name={name} size={22} brand />
              <span className="font-mono text-xs whitespace-nowrap">{name}</span>
            </span>
          ),
          title: name,
        }))}
        speed={38}
        direction="left"
        logoHeight={26}
        gap={52}
        pauseOnHover
        fadeOut
        fadeOutColor="#08090b"
        ariaLabel="Technologies"
      />
    </div>
  );
}
