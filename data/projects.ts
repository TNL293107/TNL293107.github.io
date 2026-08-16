import type { Project } from "@/types";

/**
 * Sources: the GitHub profile README, each repository's README, the actual
 * source tree, and — for CVerify — the upstream team repo's contributor and
 * commit history rather than its README team table, which understates the work.
 *
 * `period` values come from commit history (first authored commit → last), not
 * from the CV. Two corrections fell out of that check: FU-Autokit's CV range
 * ended "06/2024" but the repository is still being maintained, and DWatch's
 * suite has grown past the figure the CV and the previous build both quoted.
 *
 * Deliberately absent: user counts, uptime, revenue, benchmarks, trading
 * results. No public source supports any of them. Also dropped after reading
 * the source tree — DWatch vouchers, ratings/reviews, an analytics dashboard,
 * brute-force rate limiting and a domain-oriented refactor, all claimed by the
 * CV, none of which exist in the repository; and CVerify's "Tesseract", which
 * is not a dependency of the AI service.
 */
export const projects: readonly Project[] = [
  {
    id: "pqt",
    index: "01",
    name: "PQT",
    kind: "Quant research terminal",
    status: "in-development",
    statusLabel: "In development",
    isFeatured: true,
    period: "Since Aug 2026",
    summary:
      "A Bloomberg-inspired research workstation for the Vietnamese market. The point is the closed loop — data, research, backtest, risk, execution — because if the data is wrong, nothing downstream can be trusted.",
    facts: [
      {
        term: "Shape",
        detail:
          "Modular monolith — .NET backend, React terminal, separate Python and C++ toolchains",
      },
      {
        term: "Care",
        detail: "Point-in-time correctness; provider symbols are aliases, never keys",
      },
      {
        term: "Proof",
        detail: "163 tests across four suites; they skip loudly rather than pass silently",
      },
      {
        term: "Scope",
        detail:
          "Phase 1 of 20. Health probes, instrument identity and the terminal shell exist; market data, backtesting and execution are not written — and not stubbed either",
      },
    ],
    stack: ["C#", "ASP.NET Core", "PostgreSQL", "Redis", "React", "C++", "Docker"],
    shots: [
      {
        src: "/shots/underdevelopment.png",
        alt: "Placeholder mark: a monitor showing a code folder and a gear, standing in for a screenshot while PQT is still being built.",
        width: 512,
        height: 512,
        caption: "No capture yet — still being built",
        isStatusMark: true,
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/TNL293107/PQT" }],
  },

  {
    id: "cverify",
    index: "02",
    name: "CVerify",
    kind: "AI candidate evaluation platform",
    status: "production",
    statusLabel: "In production",
    isFeatured: true,
    period: "May – Jul 2026",
    summary:
      "Checks what a CV claims against the candidate's actual code. Static analysis for complexity, MinHash LSH for clone detection, and Claude for evaluation.",
    contribution:
      "A five-person capstone, so what I owned matters more than that I was there: the Python AI service, the C# modules behind it, and the deployment it all runs on. Third of five contributors by commit count, which corroborates the scope rather than establishing it.",
    facts: [
      {
        term: "AI pipeline",
        detail:
          "Agents, orchestrators and prompts across the candidate, JD-matching and repository pipelines, ported from C# stubs to Python/FastAPI",
      },
      {
        term: "Backend",
        detail:
          "C# modules — Profiles, Auth, SourceCode, JD and Intelligence — with the EF Core migrations behind them",
      },
      {
        term: "Extraction",
        detail:
          "PDF/DOCX/OCR to Markdown, with tolerant JSON parsing so a malformed model response degrades instead of throwing",
      },
      {
        term: "Infrastructure",
        detail:
          "AWS EC2 to GCP: nginx, SSL renewal, database and MinIO backups, health checks, three CI workflows",
      },
      {
        term: "Fixes",
        detail:
          "Made container logs reach Cloud Logging; fixed OAuth dropping a state cookie; cut one page from 22 requests",
      },
      {
        term: "Proof",
        detail: "45 unit tests on the AI components I wrote",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Claude API",
      "C#",
      ".NET 10",
      "PostgreSQL",
      "Redis",
      "GCP",
      "nginx",
      "Docker",
    ],
    shots: [
      {
        src: "/shots/CVerify1.png",
        alt: "CVerify landing page: 'Hiring based on proof, not claims' over a dark hero, with buttons to generate a verified profile or view the verification demo.",
        width: 1712,
        height: 821,
        caption: "Landing",
      },
      {
        src: "/shots/CVerify2.png",
        alt: "CVerify sign-in section: 'Verify Developers. No Backdoor Claims.' beside an Engineer/Business tabbed card offering Google or email sign-in.",
        width: 1568,
        height: 649,
        caption: "Sign-in",
      },
    ],
    /**
     * Points at the fork, on the owner's instruction — it is his copy of a
     * university-org repository that may not outlive the course. The commits
     * link is the one that actually evidences the contribution above.
     */
    links: [
      { label: "Live site", href: "https://cverify.io.vn", isPrimary: true },
      { label: "Repository", href: "https://github.com/TNL293107/CVerify-Forked" },
      {
        label: "My commits",
        href: "https://github.com/TNL293107/CVerify-Forked/commits?author=TNL293107",
      },
    ],
  },

  {
    id: "dwatch",
    index: "03",
    name: "DWatch",
    kind: "Java commerce platform",
    status: "independent",
    statusLabel: "Independent build",
    isFeatured: false,
    period: "Since Mar 2026",
    summary:
      "A watch store on plain Servlet/JSP — no framework to hide behind. Cart, COD and VietQR checkout, guest order lookup, product comparison and an admin console.",
    facts: [
      {
        term: "Security",
        detail:
          "Migrated live passwords to BCrypt on first login with no lockouts; CSRF tokens across 17 forms",
      },
      {
        term: "Orders",
        detail:
          "Dynamic VietQR codes for the exact amount, and confirmation email carrying the payment state",
      },
      {
        term: "Proof",
        detail: "56 JUnit 5 tests against mocked DAOs — the suite needs no database",
      },
    ],
    stack: ["Java 17", "Servlet/JSP", "Maven", "SQL Server", "JUnit 5", "Mockito"],
    shots: [
      {
        src: "/shots/DWatch.png",
        alt: "DWatch storefront: search bar, sign-in and cart in the header, a nav of watch categories plus order lookup, comparison and admin, and a hero reading 'Đồng Hồ Chính Hãng — Đỉnh Cao Thanh Lịch' above category filter chips.",
        width: 1912,
        height: 710,
        caption: "Storefront",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/TNL293107/DWatch" }],
  },

  {
    id: "fu-autokit",
    index: "04",
    name: "FU-Autokit",
    kind: "Browser extension — 9 university portals",
    status: "released",
    statusLabel: "v3.4",
    isFeatured: false,
    period: "Since Aug 2023",
    summary:
      "Started as something that annoyed me daily. One credential store, nine university portals, and the arithmetic students were otherwise doing by hand.",
    facts: [
      {
        term: "Reach",
        detail:
          "Auto-login across FAP, CMS, EduNext, FLM, Library, DNG, OCD, OJTMS and FeID, plus Coursera and Studocu",
      },
      {
        term: "Automation",
        detail:
          "34 site-specific content scripts — GPA calculation, grade entry, form autocomplete — behind one popup",
      },
      {
        term: "Privacy",
        detail:
          "Credentials stay in chrome.storage. No backend, nothing leaves the browser",
      },
      {
        term: "Proof",
        detail: "33 tests in CI, covering the manifest, service worker, storage and GPA maths",
      },
    ],
    stack: ["JavaScript", "Manifest V3", "Service worker", "i18n"],
    shots: [
      {
        src: "/shots/FU-Autokit.png",
        alt: "FU-Autokit popup over a browser tab: shortcut buttons for FAP, EduNext, Coursera, Thư viện, CMS, FLM, DNG, OCD and OJT, a K18/K19 account-type toggle, and fields for campus, student ID and email.",
        width: 846,
        height: 583,
        caption: "Extension popup",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/TNL293107/FU-Autokit" }],
  },
] as const;
