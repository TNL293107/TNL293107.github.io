import { learning } from "@/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

/**
 * Not a certifications wall — those live in `Credentials` further down, and are
 * a different kind of claim. This section reports what the work taught, each
 * item traceable to a README or a commit rather than to an issuer.
 */
export function Learning() {
  return (
    <section
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="learning-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeading
          id="learning-heading"
          index="05"
          kicker="Learning & milestones"
          title="The certificates are further down —"
          accent="these are the things that actually taught me most."
          lead="Each one is a point where the work got harder in a specific way, and each is checkable against the project it came from."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {learning.map((item, index) => (
            <GlowCard key={item.id} className="p-6 sm:p-7">
              <div data-reveal className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.68rem] tracking-[0.12em] text-accent uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase">
                    {item.org}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                  {item.detail}
                </p>

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] text-accent uppercase underline-offset-4 hover:underline"
                  >
                    See it running
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
