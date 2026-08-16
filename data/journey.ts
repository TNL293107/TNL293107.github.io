import type { Discipline, Experience, LearningItem } from "@/types";

/**
 * There is no professional employment history to report, so this is not a
 * "Work Experience" section and does not pretend to be one. No companies, no
 * job titles, no invented date ranges — the previous build removed
 * FU-Autokit's "2023 – 2024" for exactly this reason, and periods here are
 * stated only where a public source supports them.
 */
export const journey: readonly Experience[] = [
  {
    id: "cverify-capstone",
    title: "AI service, deployment and infrastructure",
    org: "CVerify — five-person capstone",
    period: "May – Jul 2026",
    kind: "Academic capstone · shipped to production",
    points: [
      "Ported the AI layer from C# stubs to a Python/FastAPI service — agents, orchestrators and prompts across the candidate, JD-matching and repository pipelines, covered by 45 unit tests.",
      "Built the C# side behind it: the Profiles, Auth, SourceCode, JD and Intelligence modules, with their EF Core migrations.",
      "Moved the deployment from AWS EC2 to GCP — nginx, SSL renewal, database and MinIO backups, health checks and three CI workflows.",
      "Chased the unglamorous failures: container logs never reaching Cloud Logging, an OAuth callback dropping a state cookie, a page issuing 22 requests.",
    ],
  },
  {
    id: "pqt-build",
    title: "Designing a system where correctness is the product",
    org: "PQT — personal project",
    period: "Since Aug 2026",
    kind: "In development",
    points: [
      "Modular monolith across a .NET backend, a React terminal and separate Python and C++ toolchains.",
      "Point-in-time correctness as the governing constraint: provider symbols are treated as aliases, never as keys.",
      "163 tests across four suites, written to skip loudly rather than pass silently.",
    ],
  },
  {
    id: "dwatch-build",
    title: "Web fundamentals without a framework to hide behind",
    org: "DWatch — personal project",
    period: "Since Mar 2026",
    kind: "Java / Servlet / JSP",
    points: [
      "A full commerce flow on plain Servlet and JSP: cart, COD and VietQR checkout, guest order lookup, product comparison and an admin console.",
      "Migrated live passwords to BCrypt on first login without locking anyone out, and added CSRF tokens across 17 forms.",
      "56 JUnit 5 tests against mocked DAOs, so the suite runs without a database.",
    ],
  },
  {
    id: "autokit-build",
    title: "Turning a daily annoyance into a tool other people use",
    org: "FU-Autokit — personal project",
    period: "Since Aug 2023",
    kind: "Browser extension · v3.4",
    points: [
      "Auto-login across nine university portals — FAP, CMS, EduNext, FLM, Library, DNG, OCD, OJTMS and FeID — plus Coursera and Studocu.",
      "34 content scripts behind one popup, automating GPA calculation, grade entry and form autocomplete.",
      "Credentials never leave the browser: no backend, everything in chrome.storage.",
      "Manifest V3 service worker with i18n from the start, and 33 tests running in CI.",
    ],
  },
] as const;

/** The compact answer to "what kind of engineer is this?" (§8). */
export const disciplines: readonly Discipline[] = [
  {
    id: "backend",
    title: "Backend systems",
    body: "Services, data models and the business logic between them. The part I care about is the shape of the data, not the shape of the screen.",
    items: ["ASP.NET Core", "FastAPI", "Servlet/JSP", "Domain modelling"],
  },
  {
    id: "data-infra",
    title: "Data & infrastructure",
    body: "Where things actually break. Databases, deployment, logging that reaches the logging backend, and pipelines that fail loudly.",
    items: ["PostgreSQL", "Docker", "GCP", "GitHub Actions"],
  },
  {
    id: "ai",
    title: "AI engineering",
    body: "LLMs as a component inside a system with inputs, failure modes and tests — not as a feature bolted onto a form.",
    items: ["Claude API", "Document extraction", "Evaluation pipelines"],
  },
  {
    id: "automation",
    title: "Automation",
    body: "Most of what I build started as something that annoyed me. Nine portals, one credential store, and arithmetic nobody should do by hand.",
    items: ["Manifest V3", "Service workers", "Workflow tooling"],
  },
] as const;

/**
 * Milestones, not credentials. Real certificates now live in
 * `data/certifications.ts` — sourced from the CV, which is the only thing that
 * can evidence them — and are rendered separately and more quietly.
 *
 * Everything below is a different kind of claim: traceable to a repository
 * README or to commit history, and about what the work taught rather than what
 * an issuer certified.
 */
export const learning: readonly LearningItem[] = [
  {
    id: "production",
    title: "First system running in production",
    org: "CVerify",
    detail:
      "Reachable at cverify.io.vn. Getting something deployed, logging correctly and auto-deploying taught more than the feature work did.",
    href: "https://cverify.io.vn",
  },
  {
    id: "testing",
    title: "Testing as a default, not a phase",
    org: "Across four projects",
    detail:
      "297 tests total — 163 on PQT, 56 on DWatch, 45 on the CVerify AI service, 33 on FU-Autokit. Suites that need no database and skip loudly when a dependency is missing.",
  },
  {
    id: "security",
    title: "Security fundamentals under real constraints",
    org: "DWatch",
    detail:
      "Migrating live credentials to BCrypt without locking existing users out, and retro-fitting CSRF protection across 17 existing forms.",
  },
  {
    id: "llm",
    title: "LLM integration as systems work",
    org: "CVerify",
    detail:
      "Orchestrating evaluation and JD-matching pipelines with document extraction, and treating model output as something to be tested rather than trusted.",
  },
] as const;
