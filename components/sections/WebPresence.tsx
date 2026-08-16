import { socialProfiles } from "@/data/social";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

/**
 * Three cards, not eight. LeetCode, HackerRank and the rest are absent because
 * no such profile exists — a dead link to an empty profile is worse than an
 * omitted platform.
 */
export function WebPresence() {
  return (
    <section
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="presence-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeading
          id="presence-heading"
          index="06"
          kicker="Web presence"
          title="Where the evidence lives,"
          accent="and where to reach me."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {socialProfiles.map((profile) => (
            <GlowCard key={profile.id}>
              <a
                href={profile.href}
                target={profile.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  profile.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group flex h-full flex-col p-7 focus-visible:outline-none"
                data-reveal
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">
                    {profile.platform}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="font-mono text-lg text-faint transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-1.5 font-mono text-[0.7rem] break-all text-accent">
                  {profile.handle}
                </p>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-dim">
                  {profile.description}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.68rem] tracking-[0.12em] text-faint uppercase transition-colors group-hover:text-text">
                  {profile.action}
                </span>
              </a>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
