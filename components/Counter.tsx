'use client';

import { useEffect, useRef, useState } from 'react';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/** Counts up when scrolled into view, and always lands on the real value. */
export default function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = useGsap();
    const box = { v: 0 };

    const ctx = gsap.context(() => {
      setN(0);
      gsap.to(box, {
        v: to,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => setN(Math.round(box.v)),
        onComplete: () => setN(to),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    }, el);

    // If frames never come, the true value must still appear.
    const backstop = setTimeout(() => setN(to), 3000);
    return () => { ctx.revert(); clearTimeout(backstop); setN(to); };
  }, [to]);

  return <span ref={ref} className="tabular-nums">{n}</span>;
}
