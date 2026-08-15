'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/content/site';

export default function ProjectRow({
  project,
  onPeek,
}: {
  project: Project;
  onPeek: (src: string | null, x: number, y: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const peekSrc = project.peek ?? project.shots[0]?.src ?? null;

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => { setOpen((v) => !v); onPeek(null, 0, 0); }}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse' && !open) onPeek(peekSrc, e.clientX, e.clientY); }}
        onPointerMove={(e) => { if (e.pointerType === 'mouse' && !open) onPeek(peekSrc, e.clientX, e.clientY); }}
        onPointerLeave={() => onPeek(null, 0, 0)}
        className="group grid w-full grid-cols-[2.5rem_1fr_1.25rem] items-start gap-4 py-6 text-left
                   md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)_auto_2rem] md:items-center md:gap-6 md:py-8"
      >
        <span className="pt-2 font-mono text-[10px] tracking-[0.15em] text-mute md:pt-0">{project.index}</span>

        <span className="font-display text-[clamp(1.9rem,1.1rem+2.8vw,3.5rem)] leading-none tracking-tight
                         transition-colors duration-300 group-hover:text-flare">
          {project.name}
        </span>

        <span className="col-start-2 text-sm text-mute md:col-start-auto">{project.kicker}</span>

        <span className="col-start-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mute md:col-start-auto md:justify-self-end">
          {project.state}
        </span>

        <span aria-hidden className="relative col-start-3 row-start-1 mt-2 h-3.5 w-3.5 justify-self-end md:col-start-auto md:row-start-auto md:mt-0">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${open ? 'scale-y-0' : ''}`} />
        </span>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="grid gap-8 pb-10 md:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] md:items-start md:gap-14">
            <div className="grid gap-3">
              {project.shots.map((s) => (
                <figure key={s.src} className="relative border border-line bg-surface">
                  <Image src={s.src} width={s.w} height={s.h} alt={s.alt} className="h-auto w-full" />
                  <figcaption className="absolute bottom-0 left-0 bg-bone px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-void">
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="grid gap-5">
              <p className="max-w-[38rem] leading-relaxed text-mute">{project.blurb}</p>

              {project.note && (
                <p className="border-l-2 border-flare bg-surface px-4 py-3 text-sm text-mute">
                  <b className="font-semibold text-bone">{project.note.split('.')[0]}.</b>
                  {project.note.slice(project.note.indexOf('.') + 1)}
                </p>
              )}

              <dl className="grid">
                {project.facts.map((f) => (
                  <div key={f.label} className="grid gap-1 border-t border-line py-3 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-flare">{f.label}</dt>
                    <dd className="text-sm leading-relaxed text-mute">{f.body}</dd>
                  </div>
                ))}
              </dl>

              <p className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-2.5 py-1.5 font-mono text-[10px] text-mute">{s}</span>
                ))}
              </p>

              <p className="flex flex-wrap gap-5">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="border-b border-line pb-1 font-mono text-xs transition-colors hover:border-flare hover:text-flare">
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
