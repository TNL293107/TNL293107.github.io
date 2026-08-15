'use client';

import { useEffect, useRef, createElement, type ReactNode } from 'react';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/**
 * Scroll-triggered rise.
 *
 * gsap.from() writes the hidden start state immediately, so a trigger that
 * never fires would leave the content invisible forever. The timeout below
 * clears the setup if that happens: the animation is decoration, the text
 * is the point.
 */
export default function Reveal({
  children,
  y = 28,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'p';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = useGsap();
    let fired = false;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 1,
        delay,
        ease: 'power3.out',
        onStart: () => { fired = true; },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    }, el);

    const backstop = setTimeout(() => {
      if (!fired) gsap.set(el, { clearProps: 'opacity,transform' });
    }, 2500);

    return () => { ctx.revert(); clearTimeout(backstop); };
  }, [y, delay]);

  return createElement(as, { ref, className }, children);
}
