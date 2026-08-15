'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/** Pulls toward the cursor. Mouse only — never on touch. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { gsap } = useGsap();

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength * 1.2,
        duration: 0.6,
        ease: 'power3.out',
      });
    };
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return <span ref={ref} className="inline-block will-change-transform">{children}</span>;
}
