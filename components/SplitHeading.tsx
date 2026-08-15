'use client';

import { useEffect, useRef, createElement } from 'react';
import { useGsap, prefersReducedMotion, splitWords } from '@/lib/motion';

/**
 * Masked word-by-word reveal. The words are real text in the DOM, so the
 * heading reads correctly to screen readers and search engines whether or
 * not the animation ever runs.
 */
export default function SplitHeading({
  lines,
  className = '',
  accentLast = false,
  as = 'h2',
  id,
}: {
  lines: string[];
  className?: string;
  accentLast?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = useGsap();
    const words = el.querySelectorAll<HTMLElement>('[data-word] > span');
    let fired = false;

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 108,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.05,
        onStart: () => { fired = true; },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    }, el);

    /* A heading must never be left off-screen by an animation hook that
       did not run. If the trigger has not fired by now, drop the setup. */
    const backstop = setTimeout(() => {
      if (!fired) gsap.set(words, { clearProps: 'transform' });
    }, 2500);

    return () => { ctx.revert(); clearTimeout(backstop); };
  }, [lines]);

  return createElement(
    as,
    { ref, className, id },
    lines.map((line, li) => (
      /* The trailing space keeps the accessible text content readable:
         without it two visual lines concatenate into "systemsthat". */
      <span key={li} className="block">
        {li > 0 ? ' ' : null}
        {splitWords(line).map((w, wi) =>
          /^\s+$/.test(w) ? (
            <span key={wi}> </span>
          ) : (
            <span key={wi} data-word className="inline-block overflow-hidden align-bottom">
              <span
                className={
                  'inline-block' +
                  (accentLast && li === lines.length - 1 ? ' italic text-flare' : '')
                }
              >
                {w}
              </span>
            </span>
          )
        )}
      </span>
    ))
  );
}
