import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { StackMarquee } from "@/components/skills/StackMarquee";

export function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-heading">
      <StackMarquee />

      <div className="mx-auto max-w-[88rem] px-5 py-[var(--spacing-section)] sm:px-8">
        <SectionHeading
          id="stack-heading"
          index="04"
          kicker="Technical stack"
          title="What I actually work in —"
          accent="and where I used it."
          lead="Every entry is carried by one of the four projects above, and each card says which. No proficiency percentages: a self-assigned score is not a fact about anything."
        />

        <div className="mt-14">
          <SkillsGrid />
        </div>
      </div>
    </section>
  );
}
