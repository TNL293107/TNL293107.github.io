'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Counts to 100 then lifts. Runs once per session and never for
 * reduced-motion visitors. A setTimeout backstop finishes it even if
 * rAF is throttled, so the curtain can never trap the page.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const skip =
      prefersReducedMotion() ||
      (() => {
        try { return sessionStorage.getItem('tnl-intro') === '1'; } catch { return false; }
      })();

    if (skip) { setGone(true); onDone(); return; }

    const finish = () => {
      if (done.current) return;
      done.current = true;
      try { sessionStorage.setItem('tnl-intro', '1'); } catch { /* private mode */ }
      setPct(100);
      setGone(true);
      onDone();
    };

    const DURATION = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(finish, 160);
    };
    frame = requestAnimationFrame(tick);

    const backstop = setTimeout(finish, DURATION + 900);
    return () => { cancelAnimationFrame(frame); clearTimeout(backstop); };
  }, [onDone]);

  if (gone && pct === 100) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] -translate-y-full bg-void transition-transform duration-[900ms] ease-[var(--ease-out-expo)]"
      />
    );
  }
  if (gone) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[70] flex flex-col justify-between bg-void p-6 md:p-10">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        <span>TNL293107</span>
        <span>Đà Nẵng, VN</span>
      </div>
      <p className="font-mono text-[clamp(4rem,16vw,13rem)] leading-none tracking-tight text-bone tabular-nums">
        {pct}
        <span className="text-flare">%</span>
      </p>
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        <span>Backend engineer</span>
        <span>{pct < 100 ? 'loading' : 'ready'}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div className="h-full origin-left bg-flare transition-transform duration-150" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}
