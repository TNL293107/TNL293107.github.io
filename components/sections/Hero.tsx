import { resumeUrl, site } from "@/data/site";
import { HeroHeadline } from "./HeroHeadline";
import { TypedLine } from "@/components/ui/TypedLine";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * The ten-second test (§41): who, what kind of engineer, what they build, and
 * where to go next — all above the fold, with the proof one scroll away.
 *
 * The right-hand panel is the "engineering metadata" motif: a compact,
 * terminal-adjacent facts block. It carries real information rather than
 * decoration, which is what keeps it from reading as a gaming skin.
 */
export function Hero() {
  const facts = [
    { key: "location", value: site.location },
    { key: "studying", value: site.education },
    { key: "focus", value: "Backend · Data · Infrastructure" },
    { key: "shipped", value: "cverify.io.vn" },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:pt-40 lg:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Structural grid, faded out toward the edges so it never ends on a
          hard line. Decorative only. */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/6 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-20">
        {/* ── identity ──────────────────────────────────────────────────── */}
        <div>
          <p
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-3.5 py-1.5 font-mono text-[0.65rem] tracking-[0.13em] text-accent uppercase"
            data-reveal
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {site.availability}
          </p>

          <p className="mono-label mt-7" data-reveal>
            {site.role} — {site.location}
          </p>

          <HeroHeadline text={site.headline} />

          <p
            className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-dim"
            data-reveal
          >
            {site.positioning}
          </p>

          {/* Rotating console line — the one terminal flourish on the page. */}
          <p className="mt-4 font-mono text-sm text-faint" data-reveal>
            <span className="text-accent">~/</span>{" "}
            <TypedLine
              className="text-dim"
              lines={[
                "designing data models that survive contact with real data",
                "deploying services and making the logs actually arrive",
                "wiring LLMs into pipelines that can be tested",
                "automating the things that annoyed me first",
              ]}
            />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-xs font-medium tracking-[0.1em] text-accent-ink uppercase transition-opacity hover:opacity-88"
              >
                View work
                <span aria-hidden="true">↓</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-mono text-xs tracking-[0.1em] text-text uppercase transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </MagneticButton>

            <a
              href={resumeUrl ?? `mailto:${site.email}?subject=Resume%20request`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs tracking-[0.1em] text-faint uppercase underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              {resumeUrl ? "Resume" : "Request resume"}
            </a>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs tracking-[0.1em] text-faint uppercase underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── metadata panel ────────────────────────────────────────────── */}
        <aside
          className="surface-card w-full overflow-hidden p-0 lg:mb-2"
          data-reveal
          aria-label="Profile summary"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="mono-label">profile</span>
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="h-2 w-2 rounded-full bg-white/12" />
              <i className="h-2 w-2 rounded-full bg-white/12" />
              <i className="h-2 w-2 rounded-full bg-accent/60" />
            </span>
          </div>

          <dl className="divide-y divide-border">
            {facts.map((fact) => (
              <div
                key={fact.key}
                className="grid grid-cols-[5.5rem_1fr] gap-3 px-5 py-3.5 text-sm"
              >
                <dt className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
                  {fact.key}
                </dt>
                <dd className="text-dim">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-border px-5 py-3.5">
            <p className="font-mono text-[0.68rem] leading-relaxed text-faint">
              <span className="text-accent">●</span> Every number on this page
              traces to a public repository.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
