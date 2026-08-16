import type { Certification } from "@/types";

/**
 * Straight from the CV, which is the only source for these — a certificate
 * lives in an issuer's portal, not in a repository.
 *
 * No `href` on any entry. The CV carries no credential URLs, and fabricating a
 * verification link is the single worst thing this section could do: a recruiter
 * who clicks a dead credential link stops believing the rest of the page.
 * Add one only when a real verification page exists.
 *
 * Presentation note: these are rendered as a compact strip rather than as
 * cards. Three of the five are peripheral to backend and data engineering, and
 * giving them card-sized weight would push the actual engineering evidence
 * further down the page for no gain.
 */
export const certifications: readonly Certification[] = [
  {
    id: "hkust-se",
    name: "Software Engineering Specialization",
    issuer: "The Hong Kong University of Science and Technology",
    date: "Apr 2026",
  },
  {
    id: "aws-genai",
    name: "Generative AI in Software Development",
    issuer: "Amazon",
    date: "Feb 2026",
  },
  {
    id: "ccna",
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Jul 2025",
  },
  {
    id: "ai-for-everyone",
    name: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "Mar 2025",
  },
  {
    id: "ielts",
    name: "IELTS 7.0",
    issuer: "IDP Vietnam",
    date: "Sep 2023",
  },
] as const;
