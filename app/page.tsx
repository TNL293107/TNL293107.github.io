'use client';

import { useCallback, useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Peek from '@/components/Peek';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import Counter from '@/components/Counter';
import Magnetic from '@/components/Magnetic';
import ProjectRow from '@/components/ProjectRow';
import { person, numbers, projects, stack, about } from '@/content/site';

const NAV: [string, string][] = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Stack', '#stack'],
  ['Contact', '#contact'],
];

export default function Page() {
  const [ready, setReady] = useState(false);
  const [peek, setPeek] = useState<{ src: string | null; x: number; y: number }>({
    src: null,
    x: 0,
    y: 0,
  });

  const onPeek = useCallback(
    (src: string | null, x: number, y: number) => setPeek({ src, x, y }),
    []
  );
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      {ready && <SmoothScroll />}
      <Cursor />
      <Peek {...peek} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-1/2 focus:top-0 focus:z-[80] focus:-translate-x-1/2 focus:bg-flare focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:text-void"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 mx-auto flex h-[74px] max-w-[1240px] items-center gap-6 border-b border-line bg-void/80 px-6 backdrop-blur md:px-10">
        <a href="#top" className="mr-auto whitespace-nowrap font-display text-xl">
          <span className="hidden sm:inline">{person.name}</span>
          <span className="sm:hidden">{person.short}</span>
        </a>
        <nav aria-label="Sections" className="flex gap-5 md:gap-7">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-mute transition-colors hover:text-bone"
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mute lg:flex">
          <i
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-flare shadow-[0_0_0_3px_rgba(255,77,46,0.2)]"
          />
          {person.status}
        </p>
      </header>

      <main id="main">
        <span id="top" />

        {/* hero */}
        <section className="mx-auto max-w-[1240px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-28">
          <Reveal
            as="p"
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:mb-10"
          >
            {person.role} — {person.place}
          </Reveal>

          <SplitHeading
            as="h1"
            lines={person.headline}
            accentLast
            className="font-display text-[clamp(3.5rem,1.2rem+9.4vw,9rem)] leading-[0.94] tracking-tight"
          />

          <Reveal as="p" delay={0.15} className="mt-8 max-w-[30rem] text-lg leading-relaxed text-mute">
            {person.lede}
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-void transition-colors hover:bg-flare"
              >
                See the work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${person.email}`}
                className="inline-flex rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-bone"
              >
                Email me
              </a>
            </Magnetic>
          </Reveal>
        </section>

        {/* numbers */}
        <section
          aria-labelledby="numbers-h"
          className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          <h2 id="numbers-h" className="sr-only">
            By the numbers
          </h2>
          {numbers.map((n) => (
            <Reveal key={n.label} className="bg-void px-6 py-10 text-center md:py-14">
              <b className="block font-display text-[clamp(2.75rem,1.6rem+4vw,4.5rem)] leading-none text-flare">
                <Counter to={n.value} />
              </b>
              <span className="mx-auto mt-3 block max-w-[13rem] text-[13px] leading-snug text-mute">
                {n.label}
              </span>
            </Reveal>
          ))}
        </section>

        {/* work */}
        <section id="work" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
          <div className="mb-12 md:mb-16">
            <Reveal as="p" className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              Selected work
            </Reveal>
            <SplitHeading
              lines={['Four things', 'I built.']}
              accentLast
              className="font-display text-[clamp(2.6rem,1.4rem+4.8vw,5.5rem)] leading-[0.95] tracking-tight"
            />
          </div>
          <div className="border-t border-line">
            {projects.map((p) => (
              <ProjectRow key={p.index} project={p} onPeek={onPeek} />
            ))}
          </div>
        </section>

        {/* about */}
        <section
          id="about"
          className="mx-auto max-w-[1240px] border-t border-line px-6 py-24 md:px-10 md:py-36"
        >
          <Reveal as="p" className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            About
          </Reveal>
          <SplitHeading
            lines={[about.statement]}
            className="max-w-[22ch] font-display text-[clamp(1.9rem,1rem+3.2vw,3.75rem)] leading-[1.1] tracking-tight"
          />
          <div className="ml-auto mt-12 grid max-w-[52rem] gap-6 md:mt-16 md:grid-cols-2 md:gap-14">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 0.1} className="leading-relaxed text-mute">
                {p}
              </Reveal>
            ))}
          </div>
        </section>

        {/* stack */}
        <section
          id="stack"
          className="mx-auto max-w-[1240px] border-t border-line px-6 py-24 md:px-10 md:py-36"
        >
          <Reveal as="p" className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Stack
          </Reveal>
          <dl className="border-t border-line">
            {stack.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.04}>
                <div className="grid items-baseline gap-1 border-b border-line py-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6">
                  <dt className="font-display text-xl">{s.label}</dt>
                  <dd className="font-mono text-sm leading-relaxed text-mute">{s.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* contact */}
        <section
          id="contact"
          className="mx-auto max-w-[1240px] border-t border-line px-6 py-24 md:px-10 md:py-36"
        >
          <Reveal as="p" className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Contact
          </Reveal>
          <SplitHeading
            lines={['Let us build something', 'worth shipping.']}
            accentLast
            className="font-display text-[clamp(2.6rem,1.4rem+4.8vw,5.5rem)] leading-[0.95] tracking-tight"
          />
          <Reveal delay={0.15} className="mt-10">
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-3 border-b-2 border-bone pb-2 font-display text-[clamp(1.35rem,.9rem+2.2vw,2.75rem)] transition-colors hover:border-flare hover:text-flare"
              >
                {person.email} <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-6">
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:border-bone hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:border-bone hover:text-bone"
            >
              LinkedIn
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-line px-6 py-8 font-mono text-[10px] uppercase tracking-[0.1em] text-mute md:px-10">
        <span>© 2026 {person.name}</span>
        <span>{person.place}</span>
      </footer>
    </>
  );
}
