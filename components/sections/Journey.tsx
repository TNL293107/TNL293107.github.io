import { journey } from "@/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Not "Work Experience". There is no employment history to report, so this is
 * framed as engineering work rather than dressed up as a career — no companies,
 * no job titles, no invented date ranges.
 *
 * The reference site's timeline structure (role, org, period, bullets) is kept
 * because it is genuinely the right shape for scannable experience; only the
 * claims differ.
 */
export function Journey() {
  return (
    <section
      id="journey"
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeading
          id="journey-heading"
          index="02"
          kicker="Engineering journey"
          title="No job titles yet —"
          accent="here is the work instead."
          lead="Four builds, one of them running in production. What follows is scoped to what I actually did, and each claim is checkable against the repository it came from."
        />

        <ol className="mt-16 border-t border-border">
          {journey.map((entry) => (
            <li
              key={entry.id}
              data-reveal
              className="group grid gap-x-10 gap-y-4 border-b border-border py-9 lg:grid-cols-[16rem_1fr]"
            >
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.12em] text-accent uppercase">
                  {entry.period}
                </p>
                <p className="mt-2 font-display text-base font-semibold text-text">
                  {entry.org}
                </p>
                <p className="mt-1 font-mono text-[0.68rem] tracking-[0.08em] text-faint uppercase">
                  {entry.kind}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text transition-colors duration-300 group-hover:text-accent">
                  {entry.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-border-strong"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
