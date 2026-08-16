import { resumeUrl, site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopyEmail } from "@/components/ui/CopyEmail";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_60%_at_50%_100%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-[88rem]">
        <SectionHeading
          id="contact-heading"
          index="07"
          kicker="Contact"
          title="Let's build something"
          accent="worth shipping."
          lead="Open to backend, data engineering, and interesting systems problems. Internships included — I would rather work on something hard than something safe."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* ── email ─────────────────────────────────────────────────────── */}
          <div className="surface-card p-7 sm:p-10" data-reveal>
            <p className="mono-label">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-display text-2xl font-semibold break-all transition-colors hover:text-accent sm:text-4xl"
            >
              {site.email}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-accent-ink uppercase transition-opacity hover:opacity-85"
                >
                  Send an email
                  <span aria-hidden="true">↗</span>
                </a>
              </MagneticButton>
              <CopyEmail email={site.email} />
            </div>

            <div className="mt-9 grid gap-3 border-t border-border pt-7 sm:grid-cols-2">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:border-border-strong"
              >
                <span className="font-mono text-[0.7rem] tracking-[0.1em] text-dim uppercase">
                  GitHub
                </span>
                <span
                  aria-hidden="true"
                  className="text-faint transition-colors group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:border-border-strong"
              >
                <span className="font-mono text-[0.7rem] tracking-[0.1em] text-dim uppercase">
                  LinkedIn
                </span>
                <span
                  aria-hidden="true"
                  className="text-faint transition-colors group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* ── resume ────────────────────────────────────────────────────── */}
          <div className="surface-card flex flex-col p-7 sm:p-10" data-reveal>
            <p className="mono-label">Resume</p>

            {resumeUrl ? (
              <>
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  On paper
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                  The same story as this page, condensed to two printable pages —
                  with dates, and a couple of projects that are not shown here.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors hover:border-accent hover:text-accent"
                  >
                    Open PDF
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-[0.68rem] tracking-[0.1em] text-dim uppercase transition-colors hover:text-text"
                  >
                    Download
                  </a>
                </div>
              </>
            ) : (
              <>
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  Available on request
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                  There is no PDF posted here yet, and I would rather say so than
                  put up a placeholder. Ask and I will send the current one the
                  same day.
                </p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Resume request")}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  Request it
                  <span aria-hidden="true">↗</span>
                </a>
              </>
            )}

            <dl className="mt-9 space-y-3 border-t border-border pt-7">
              <div className="flex justify-between gap-4 text-sm">
                <dt className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
                  Based in
                </dt>
                <dd className="text-right text-dim">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <dt className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
                  Status
                </dt>
                <dd className="text-right text-accent">Open to internships</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
