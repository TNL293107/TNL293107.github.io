import type { NavigationItem } from "@/types";

/**
 * Identity and global constants.
 *
 * CONTENT POLICY (carried over from the previous build, and still binding):
 * nothing here ships unless a public source supports it. GitHub — the profile
 * README, repository READMEs and commit history — outranks the CV, which is an
 * older snapshot. Facts previously dropped for lack of a public source: GPA,
 * "10+ portals" (the README says nine), "hundreds of student users", DWatch
 * ratings/reviews, and FU-Autokit's 2023–2024 date range.
 */
export const site = {
  name: "Trần Nhất Long",
  shortName: "TNL",
  handle: "TNL293107",
  role: "Backend / Data Engineer",
  location: "Đà Nẵng, Việt Nam",
  email: "long293107@gmail.com",
  url: "https://tnl293107.github.io",
  github: "https://github.com/TNL293107",
  linkedin: "https://www.linkedin.com/in/tr%E1%BA%A7n-nh%E1%BA%A5t-long-a78122325/",
  education: "Software Engineering, FPT University Đà Nẵng",

  headline: "I build systems that hold up.",
  positioning:
    "Backend services, data models, AI pipelines, and the infrastructure they run on.",
  availability: "Open to backend / data engineering internships",
} as const;

/**
 * Setting this switches every resume affordance on the page — navbar, hero and
 * the contact panel — from "request by email" to a real open/download pair.
 * Set it back to `null` and they all revert.
 *
 * Note the file is public and indexable once deployed: it carries a phone
 * number, which the page itself deliberately does not.
 */
export const resumeUrl: string | null =
  "/resume/Tran-Nhat-Long-Backend-Data-Engineer.pdf";

export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * The fastest honest signal available, and every figure is checkable.
 * 163 (PQT) + 45 (CVerify) + 56 (DWatch) + 33 (FU-Autokit) = 297.
 *
 * DWatch was counted at 54 in the previous build; the suite has since grown to
 * 56 (`@Test` and `@ParameterizedTest` across five test classes), so the total
 * moved with it. Recount before editing this rather than adjusting to taste.
 *
 * The commit figure is kept deliberately narrow — "commits authored", not
 * "contribution". Commit count corroborates the CVerify work described on the
 * project card; it is not offered as a measure of it.
 */
export const metrics = [
  { value: 297, suffix: "", label: "tests written across four projects" },
  { value: 82, suffix: "/413", label: "commits authored on the CVerify team repo" },
  { value: 9, suffix: "", label: "university portals automated" },
  { value: 1, suffix: "", label: "system running in production" },
] as const;
