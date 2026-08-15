'use client';

import { useEffect, useRef } from 'react';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/** Screenshot preview that glides after the cursor over the work list. */
export default function Peek({ src, x, y }: { src: string | null; x: number; y: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = useGsap();
    quick.current = {
      x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' }),
    };
  }, []);

  useEffect(() => {
    if (!src || !quick.current) return;
    quick.current.x(x);
    quick.current.y(y);
  }, [src, x, y]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-40 h-[200px] w-[280px] -translate-x-1/2 -translate-y-1/2
                  overflow-hidden border border-line bg-surface shadow-2xl transition-opacity duration-300
                  ${src ? 'opacity-100' : 'invisible opacity-0'}`}
    >
      {src && <img src={src} alt="" className="h-full w-full object-cover object-top" />}
    </div>
  );
}
