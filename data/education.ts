import type { Education } from "@/types";

/**
 * The CV is the only authority here — no repository can evidence a degree or a
 * scholarship, so GitHub has nothing to say about this section and the usual
 * "GitHub outranks the CV" rule simply does not apply.
 *
 * Deliberately absent: GPA. It was dropped from the previous build for lack of
 * a public source, and it is a moving number that dates the page the moment it
 * changes. The scholarship is a fixed, checkable fact; the GPA is not.
 *
 * Also absent: an expected graduation date. The CV gives a start year only, and
 * inventing an end year to make the timeline look tidy is exactly the kind of
 * manufactured precision this project refuses.
 */
export const education: Education = {
  institution: "FPT University Đà Nẵng",
  degree: "Bachelor of Software Engineering",
  period: "Since 2024",
  notes: ["100% full scholarship"],
} as const;
