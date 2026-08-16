import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiveBorder } from "@/components/ui/LiveBorder";
import {
  CompactProjectCard,
  FeaturedProjectCard,
} from "@/components/projects/ProjectCard";

/**
 * Visual weight follows what the work actually proves, rather than giving four
 * projects four identical cards:
 *
 *   CVerify  — full width, animated accent border, "Live site" as the primary
 *              action. It is the only thing here running in production.
 *   PQT      — full width, amber status, an honest "no capture yet" mark
 *              instead of a fabricated screenshot.
 *   DWatch / FU-Autokit — compact pair, same information, less space.
 */
export function Projects() {
  const featured = projects.filter((project) => project.isFeatured);
  const compact = projects.filter((project) => !project.isFeatured);

  return (
    <section
      id="projects"
      className="px-5 py-[var(--spacing-section)] sm:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[88rem]">
        <SectionHeading
          id="projects-heading"
          index="03"
          kicker="Projects"
          title="Four things I built —"
          accent="one of them is live."
          lead="Screenshots are real captures, not mockups. Where a project is unfinished it says so, and where the work was shared the split is stated."
        />

        <div className="mt-16 space-y-5">
          {featured.map((project) =>
            project.status === "production" ? (
              <LiveBorder key={project.id}>
                <FeaturedProjectCard project={project} />
              </LiveBorder>
            ) : (
              <FeaturedProjectCard key={project.id} project={project} />
            ),
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            {compact.map((project) => (
              <CompactProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-[0.7rem] tracking-[0.1em] text-faint uppercase">
          More on{" "}
          <a
            href="https://github.com/TNL293107"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            github.com/TNL293107
          </a>
        </p>
      </div>
    </section>
  );
}
