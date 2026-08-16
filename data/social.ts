import type { SocialProfile } from "@/types";
import { site } from "./site";

/**
 * Only profiles that actually exist and are actually used. No LeetCode,
 * HackerRank, Codeforces or Twitter entry — inventing a link to an empty or
 * non-existent profile is worse than omitting the platform.
 */
export const socialProfiles: readonly SocialProfile[] = [
  {
    id: "github",
    platform: "GitHub",
    handle: `@${site.handle}`,
    description:
      "Every project on this page, plus the commit history behind the claims made about them.",
    href: site.github,
    action: "Browse the code",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    handle: "Trần Nhất Long",
    description:
      "Education, background and the usual professional context. The fastest way to reach me about a role.",
    href: site.linkedin,
    action: "Connect",
  },
  {
    id: "email",
    platform: "Email",
    handle: site.email,
    description:
      "Direct, and the one I actually read. Backend, data engineering, or an interesting systems problem.",
    href: `mailto:${site.email}`,
    action: "Write to me",
  },
] as const;
