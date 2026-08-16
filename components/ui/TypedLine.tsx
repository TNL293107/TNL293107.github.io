"use client";

import TextType from "@/components/reactbits/TextType";
import { useIsHydrated, useReducedMotion } from "@/lib/hooks/useMediaQuery";

interface TypedLineProps {
  lines: readonly string[];
  className?: string;
}

/**
 * A terminal-flavoured rotating line — one of the few places the "engineering
 * console" motif is allowed to show, and deliberately the only typing effect
 * on the page.
 *
 * Accessibility: the animated text is `aria-hidden`, and the full set of lines
 * is exposed once in visually-hidden text. Without that, a screen reader
 * announces a character-by-character stream, and the content would be lost
 * entirely for anyone whose JS never runs.
 */
export function TypedLine({ lines, className }: TypedLineProps) {
  const isHydrated = useIsHydrated();
  const isReduced = useReducedMotion();
  const shouldAnimate = isHydrated && !isReduced;

  const fallback = lines[0] ?? "";

  return (
    <>
      <span className="sr-only">{lines.join(". ")}</span>

      <span aria-hidden="true" className={className}>
        {shouldAnimate ? (
          <TextType
            as="span"
            text={[...lines]}
            typingSpeed={38}
            deletingSpeed={18}
            pauseDuration={2600}
            initialDelay={900}
            loop
            showCursor
            cursorCharacter="▍"
            cursorClassName="text-accent"
          />
        ) : (
          fallback
        )}
      </span>
    </>
  );
}
