"use client";

import { useMemo, useRef, useState } from "react";
import type { SkillCategoryId } from "@/types";
import { skillCategories, skills } from "@/data/skills";
import { TechMark } from "@/components/ui/TechMark";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function SkillsGrid() {
  const [active, setActive] = useState<SkillCategoryId>("all");
  const gridRef = useRef<HTMLUListElement>(null);

  const visible = useMemo(
    () =>
      active === "all"
        ? skills
        : skills.filter((skill) =>
            skill.categories.includes(active as Exclude<SkillCategoryId, "all">),
          ),
    [active],
  );

  // Re-stagger the surviving cards whenever the filter changes. Keyed on
  // `active` so it fires per filter change rather than per render.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 14, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: "power3.out",
          stagger: 0.022,
          overwrite: true,
        },
      );
    },
    { scope: gridRef, dependencies: [active] },
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter skills by category"
        className="flex flex-wrap gap-2"
        data-reveal
      >
        {skillCategories.map((category) => {
          const isActive = active === category.id;
          const count =
            category.id === "all"
              ? skills.length
              : skills.filter((skill) =>
                  skill.categories.includes(
                    category.id as Exclude<SkillCategoryId, "all">,
                  ),
                ).length;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-all duration-300",
                isActive
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-border text-faint hover:border-border-strong hover:text-text",
              )}
            >
              {category.label}
              <span className={cn("text-[0.62rem]", isActive ? "opacity-60" : "opacity-50")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Announce the result count rather than leaving a filter change silent
          for screen-reader users. */}
      <p aria-live="polite" className="sr-only">
        {visible.length} skills shown.
      </p>

      <ul
        ref={gridRef}
        className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {visible.map((skill) => (
          <li
            key={skill.name}
            className="surface-card group flex items-center gap-3 p-3.5 hover:border-accent/35"
          >
            {skill.icon ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-bg-raised">
                <TechMark name={skill.icon} size={16} brand />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-bg-raised font-mono text-[0.7rem] text-faint"
              >
                {skill.name.slice(0, 2)}
              </span>
            )}

            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-text">
                {skill.name}
              </span>
              {/* The evidence, on the card. Keeps the list from drifting into
                  a wishlist of technologies. */}
              <span className="block truncate font-mono text-[0.62rem] text-faint">
                {skill.usedIn.join(", ")}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
