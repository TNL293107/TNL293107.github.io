/**
 * Content model for the site. Every section renders from `data/`, so adding a
 * project or a skill never means touching a component.
 */

/** Where a project actually stands. Drives colour, not just a label. */
export type ProjectStatus = "production" | "in-development" | "released" | "independent";

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  /** Marks the single link that proves the thing is real and reachable. */
  readonly isPrimary?: boolean;
}

export interface ProjectShot {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption: string;
  /**
   * A square status glyph rather than a screen capture. Held at its own size
   * instead of being stretched across a landscape frame.
   */
  readonly isStatusMark?: boolean;
}

export interface ProjectFact {
  readonly term: string;
  readonly detail: string;
}

export interface Project {
  readonly id: string;
  /** Display index — "01".."04". */
  readonly index: string;
  readonly name: string;
  /** One line under the name, e.g. "Quant research terminal". */
  readonly kind: string;
  readonly status: ProjectStatus;
  readonly statusLabel: string;
  /** Featured projects get a wider cell and a screenshot. */
  readonly isFeatured: boolean;
  readonly summary: string;
  /**
   * Derived from commit history, never from the CV — first authored commit to
   * last. Omitted rather than guessed when history cannot establish it.
   */
  readonly period?: string;
  /**
   * What *I* did, as distinct from what the project is. Present only where the
   * work was shared and the distinction matters. Leads with the engineering
   * surface owned; commit counts are corroboration, not the claim itself.
   */
  readonly contribution?: string;
  readonly facts: readonly ProjectFact[];
  readonly stack: readonly string[];
  readonly shots: readonly ProjectShot[];
  readonly links: readonly ProjectLink[];
}

/**
 * "testing" is not in the original section brief, but 295 tests across four
 * projects is this profile's single best-evidenced claim — dropping the tools
 * that produce it would understate the work.
 */
export type SkillCategoryId =
  | "all"
  | "languages"
  | "backend"
  | "data"
  | "infrastructure"
  | "ai"
  | "testing";

export interface SkillCategory {
  readonly id: SkillCategoryId;
  readonly label: string;
}

export interface Skill {
  readonly name: string;
  readonly categories: readonly Exclude<SkillCategoryId, "all">[];
  /** Key into `data/icons.ts`; absent when no mark exists for it. */
  readonly icon?: string;
  /** Which project this is evidenced by — keeps the list honest. */
  readonly usedIn: readonly string[];
}

export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly org: string;
  readonly period: string;
  readonly kind: string;
  readonly points: readonly string[];
}

export interface Discipline {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly items: readonly string[];
}

export interface LearningItem {
  readonly id: string;
  readonly title: string;
  readonly org: string;
  readonly detail: string;
  /** Only set when a public, checkable artefact exists. */
  readonly href?: string;
}

/**
 * Credentials come from the CV, which is the only authority for them — no
 * repository can evidence an IELTS band or a Coursera certificate. Each entry
 * names its issuer and date so a recruiter can ask for the certificate itself.
 */
export interface Certification {
  readonly id: string;
  readonly name: string;
  readonly issuer: string;
  readonly date: string;
  /** Set only if a verification page is ever published. */
  readonly href?: string;
}

export interface Education {
  readonly institution: string;
  readonly degree: string;
  readonly period: string;
  /** Distinctions that are facts, not self-assessments. */
  readonly notes: readonly string[];
}

export interface SocialProfile {
  readonly id: string;
  readonly platform: string;
  readonly handle: string;
  readonly description: string;
  readonly href: string;
  /** Short verb used as the card's call to action. */
  readonly action: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}
