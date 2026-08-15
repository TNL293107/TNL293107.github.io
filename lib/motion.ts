'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** GSAP plugins must only be registered once, and only in the browser. */
export function useGsap() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Split a string into word spans a mask can slide out from. */
export function splitWords(text: string) {
  return text.split(/(\s+)/).filter(Boolean);
}
