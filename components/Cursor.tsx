'use client';

import { useEffect, useRef } from 'react';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/** Additive cursor ring. The native cursor is left alone. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { gsap } = useGsap();

    const toX = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      el.style.opacity = '1';
      toX(e.clientX);
      toY(e.clientY);
      const hot = (e.target as Element)?.closest?.('a, button, summary');
      gsap.to(el, { scale: hot ? 1.9 : 1, duration: 0.3, ease: 'power3.out' });
    };
    const hide = () => { el.style.opacity = '0'; };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65] -ml-3 -mt-3 h-6 w-6 rounded-full
                 border border-bone opacity-0 mix-blend-difference transition-opacity duration-300" />
  );
}
