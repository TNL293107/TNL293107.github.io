import type { Certification } from "@/types";

/**
 * Straight from the CV, which is the only source for these — a certificate
 * lives in an issuer's portal, not in a repository.
 *
 * Two independent optional fields, because the real credentials do not line up
 * neatly:
 *   - `href`  — a real verification page. Coursera issues one; Cisco does not.
 *   - `image` — a scan of the certificate, used for the hover preview.
 *
 * CCNA therefore has a scan and no link; IELTS has neither and stays a plain
 * row. Nothing here is fabricated to make the set look uniform — a dead
 * verification link is the single worst thing this section could ship, because
 * a recruiter who clicks one stops believing the rest of the page.
 *
 * Scans are cropped to the certificate itself (the PDF viewer's grey frame is
 * trimmed) and encoded to WebP at 1400px wide. `width`/`height` are the real
 * encoded dimensions — next/image uses them to reserve space, so a wrong value
 * shows up as layout shift.
 *
 * Presentation note: rendered as a compact strip rather than as cards. These
 * are peripheral to backend and data engineering, and card-sized weight would
 * push the actual engineering evidence further down the page for no gain.
 */
export const certifications: readonly Certification[] = [
  {
    id: "hkust-se",
    name: "Software Engineering Specialization",
    issuer: "The Hong Kong University of Science and Technology",
    date: "Apr 2026",
    href: "https://coursera.org/share/eb6b29f0296148a4faca819d9e72fc77",
    image: {
      src: "/certificates/software-engineering.webp",
      width: 1400,
      height: 1116,
    },
  },
  {
    id: "aws-genai",
    name: "Generative AI in Software Development",
    issuer: "Amazon",
    date: "Feb 2026",
    href: "https://coursera.org/share/6a1f2907d1ce41297760af7915663c04",
    image: {
      src: "/certificates/generative-ai.webp",
      width: 1400,
      height: 1087,
    },
  },
  {
    id: "ccna",
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Jul 2025",
    image: { src: "/certificates/ccna.webp", width: 1400, height: 933 },
  },
  {
    id: "ielts",
    name: "IELTS 7.0",
    issuer: "IDP Vietnam",
    date: "Sep 2023",
  },
] as const;
