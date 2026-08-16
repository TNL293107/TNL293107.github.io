import { education } from "@/data/education";
import { certifications } from "@/data/certifications";

/**
 * The one section on the page that GitHub cannot source. A degree, a
 * scholarship and five certificates live in the CV and in issuers' portals,
 * nowhere else — so this is where the CV is the authority rather than the
 * weaker witness.
 *
 * Deliberately quiet. Education gets real weight because the scholarship is a
 * genuine distinction; the certificates get a single dense list because three
 * of the five are peripheral to backend and data work, and giving them cards
 * would push the engineering evidence down the page to say less.
 *
 * No "Verify" links: the CV carries no credential URLs and none will be
 * invented. `Certification.href` exists for the day a real one does.
 */
export function Credentials() {
  return (
    <section
      id="credentials"
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="credentials-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-x-16 gap-y-12 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* ── education ──────────────────────────────────────────────── */}
          <div>
            <h2 id="credentials-heading" className="mono-label">
              Education
            </h2>

            <div data-reveal className="mt-7">
              <p className="font-display text-2xl font-semibold sm:text-[1.75rem]">
                {education.institution}
              </p>
              <p className="mt-2 text-dim">{education.degree}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.08em] text-faint uppercase">
                  {education.period}
                </span>
                {education.notes.map((note) => (
                  <span
                    key={note}
                    className="rounded-md border border-accent/30 bg-accent/[0.07] px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.08em] text-accent uppercase"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── certifications ─────────────────────────────────────────── */}
          <div>
            <h2 className="mono-label">Certifications</h2>

            <ul className="mt-7 divide-y divide-border border-y border-border">
              {certifications.map((certification) => (
                <li
                  key={certification.id}
                  data-reveal
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                >
                  <span className="text-sm text-text">{certification.name}</span>
                  <span className="font-mono text-[0.68rem] tracking-[0.06em] text-faint">
                    {certification.issuer} · {certification.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
