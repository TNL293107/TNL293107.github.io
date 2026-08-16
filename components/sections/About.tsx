import { disciplines } from "@/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

/**
 * Voice carried over from the previous build, deliberately: the "data model and
 * the flow, not the screen" line and "most of what I build started as something
 * that annoyed me" are the two sentences that make this page sound like a
 * person rather than a template.
 */
export function About() {
  return (
    <section
      id="about"
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeading
          id="about-heading"
          index="01"
          kicker="About"
          title="I like problems where the hard part is the data model and the flow,"
          accent="not the screen."
        />

        <div className="mt-14 grid gap-x-16 gap-y-8 border-t border-border pt-12 lg:grid-cols-3">
          <p className="text-[length:var(--text-lead)] leading-relaxed text-text" data-reveal>
            Software Engineering student at FPT University Đà Nẵng. Most of what I
            build started as something that annoyed me.
          </p>
          <p className="leading-relaxed text-dim" data-reveal>
            The half I enjoy is unglamorous — why logs never reached the logging
            backend, why an OAuth callback dropped a cookie, why one page was
            issuing twenty-two requests. That is usually where a system is
            actually broken, and it is rarely in the part anyone demos.
          </p>
          <p className="leading-relaxed text-dim" data-reveal>
            So I work backwards from failure: what happens when the data is
            wrong, when the provider renames a symbol, when the deploy succeeds
            but nothing logs. Tests and boring infrastructure are how that
            question gets answered, which is why there are 297 of them.
          </p>
        </div>

        {/* ── engineering identity ───────────────────────────────────────── */}
        <div className="mt-24">
          <p className="mono-label" data-reveal>
            What kind of engineer
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {disciplines.map((discipline) => (
              <GlowCard key={discipline.id} className="p-6" >
                <div data-reveal className="flex h-full flex-col">
                  <h3 className="font-display text-lg font-semibold">
                    {discipline.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                    {discipline.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {discipline.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] text-faint"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
