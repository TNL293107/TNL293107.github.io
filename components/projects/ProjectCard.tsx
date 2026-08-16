import Image from "next/image";
import type { Project } from "@/types";
import { StatusPill } from "@/components/ui/StatusPill";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors duration-300",
            link.isPrimary
              ? "bg-accent text-accent-ink hover:opacity-85"
              : "border border-border text-dim hover:border-border-strong hover:text-text",
          )}
        >
          {link.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function StackTags({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[0.65rem] text-faint transition-colors duration-300 hover:border-accent/40 hover:text-accent"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Shot({ shot }: { shot: Project["shots"][number] }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-bg-raised",
        shot.isStatusMark && "flex flex-col items-center justify-center py-10",
      )}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          shot.isStatusMark
            ? "h-28 w-28 opacity-45"
            : "h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]",
        )}
      />
      <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** Full-width treatment for the two projects carrying the most weight. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group surface-card overflow-hidden p-6 sm:p-9" data-reveal>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-faint">{project.index}</span>
          <div>
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[0.7rem] tracking-[0.1em] text-faint uppercase">
              {project.kind}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {project.period ? (
            <span className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
              {project.period}
            </span>
          ) : null}
          <StatusPill status={project.status} label={project.statusLabel} />
        </div>
      </header>

      <div className="mt-8 grid gap-8 border-t border-border pt-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <p className="text-[length:var(--text-lead)] leading-relaxed text-dim">
            {project.summary}
          </p>

          {project.contribution ? (
            <p className="mt-5 rounded-lg border-l-2 border-accent/50 bg-accent/4 py-3 pr-4 pl-4 text-sm leading-relaxed text-dim">
              <span className="font-mono text-[0.65rem] tracking-[0.12em] text-accent uppercase">
                My contribution
              </span>
              <br />
              {project.contribution}
            </p>
          ) : null}

          <dl className="mt-7 divide-y divide-border border-t border-border">
            {project.facts.map((fact) => (
              <div key={fact.term} className="grid gap-1 py-3.5 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <dt className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
                  {fact.term}
                </dt>
                <dd className="text-sm leading-relaxed text-dim">{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <StackTags stack={project.stack} />
          <ProjectLinks project={project} />
        </div>

        <div className="flex flex-col gap-4">
          {project.shots.map((shot) => (
            <Shot key={shot.src} shot={shot} />
          ))}
        </div>
      </div>
    </article>
  );
}

/** Compact treatment — same information architecture, less visual space. */
export function CompactProjectCard({ project }: { project: Project }) {
  const shot = project.shots[0];

  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden" data-reveal>
      {shot ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg-raised">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-faint">{project.index}</span>
            <h3 className="font-display text-xl font-semibold">{project.name}</h3>
          </div>
          <StatusPill status={project.status} label={project.statusLabel} />
        </header>

        <p className="mt-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
          {project.kind}
          {project.period ? ` · ${project.period}` : ""}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-dim">{project.summary}</p>

        <dl className="mt-5 space-y-2.5">
          {project.facts.map((fact) => (
            <div key={fact.term} className="text-sm">
              <dt className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase">
                {fact.term}
              </dt>
              <dd className="mt-0.5 leading-relaxed text-dim">{fact.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto">
          <StackTags stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
