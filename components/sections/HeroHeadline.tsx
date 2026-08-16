"use client";

import SplitText from "@/components/reactbits/SplitText";

/**
 * The page's one h1, revealed word by word on load.
 *
 * Words rather than characters: at hero size a per-character stagger reads as a
 * slot machine, and it multiplies the DOM by roughly 5x for no gain. SplitText
 * reverts its own DOM surgery on unmount, and short-circuits entirely under
 * reduced motion (see the adaptation note in the component).
 */
export function HeroHeadline({ text }: { text: string }) {
  return (
    <h1
      id="hero-heading"
      className="mt-5 max-w-4xl text-[length:var(--text-hero)] leading-[0.98] font-semibold"
    >
      <SplitText
        text={text}
        tag="span"
        splitType="words"
        textAlign="left"
        delay={55}
        duration={1}
        ease="power4.out"
        from={{ opacity: 0, y: 62 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.05}
        rootMargin="0px"
        className="!inline"
      />
    </h1>
  );
}
