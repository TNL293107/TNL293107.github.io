'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useGsap, prefersReducedMotion } from '@/lib/motion';

/**
 * Lenis drives the scroll position and GSAP's ScrollTrigger reads from it,
 * so both agree on where the page is. Without wiring the two together,
 * pinned sections drift away from the content they are pinned to.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = useGsap();
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
