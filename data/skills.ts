import type { Skill, SkillCategory } from "@/types";

export const skillCategories: readonly SkillCategory[] = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data" },
  { id: "testing", label: "Testing" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "ai", label: "AI" },
] as const;

/**
 * Every entry is carried by at least one project in `data/projects.ts` — the
 * `usedIn` field is the evidence, and it is rendered on the card. Nothing is
 * listed because it is popular. No proficiency percentages: a self-assigned
 * "95%" is not a fact about anything.
 *
 * Left off despite appearing on the CV, because no project here evidences them:
 * Spring Boot / Spring MVC / Spring Data JPA, AssertJ (DWatch's `pom.xml` has
 * JUnit and Mockito only), Tesseract (the AI service extracts via markitdown),
 * Swagger/OpenAPI and HTML5/CSS3. A skills list is only worth reading if the
 * absences mean something too.
 *
 * Also left off: pgvector. The CVerify database layer is plain
 * Npgsql.EntityFrameworkCore.PostgreSQL with no vector extension.
 */
export const skills: readonly Skill[] = [
  // ── Languages ────────────────────────────────────────────────────────────
  { name: "C#", icon: "C#", categories: ["languages"], usedIn: ["PQT", "CVerify"] },
  { name: "Java", icon: "Java", categories: ["languages"], usedIn: ["DWatch"] },
  { name: "Python", icon: "Python", categories: ["languages"], usedIn: ["CVerify"] },
  { name: "TypeScript", icon: "TypeScript", categories: ["languages"], usedIn: ["PQT"] },
  {
    name: "JavaScript",
    icon: "JavaScript",
    categories: ["languages"],
    usedIn: ["FU-Autokit"],
  },
  { name: "C++", icon: "C++", categories: ["languages"], usedIn: ["PQT"] },
  { name: "SQL", categories: ["languages", "data"], usedIn: ["PQT", "DWatch"] },

  // ── Backend ──────────────────────────────────────────────────────────────
  {
    name: "ASP.NET Core",
    icon: ".NET",
    categories: ["backend"],
    usedIn: ["PQT", "CVerify"],
  },
  {
    name: "EF Core",
    icon: ".NET",
    categories: ["backend", "data"],
    usedIn: ["PQT", "CVerify"],
  },
  { name: "FastAPI", icon: "FastAPI", categories: ["backend"], usedIn: ["CVerify"] },
  { name: "Servlet/JSP", icon: "Java", categories: ["backend"], usedIn: ["DWatch"] },
  { name: "OAuth 2.0", categories: ["backend"], usedIn: ["CVerify"] },
  { name: "React", icon: "React", categories: ["backend"], usedIn: ["PQT"] },

  // ── Data ─────────────────────────────────────────────────────────────────
  {
    name: "PostgreSQL",
    icon: "PostgreSQL",
    categories: ["data"],
    usedIn: ["PQT", "CVerify"],
  },
  { name: "SQL Server", icon: "SQL Server", categories: ["data"], usedIn: ["DWatch"] },
  { name: "Redis", icon: "Redis", categories: ["data"], usedIn: ["PQT", "CVerify"] },

  // ── Testing ──────────────────────────────────────────────────────────────
  { name: "xUnit", categories: ["testing"], usedIn: ["PQT"] },
  { name: "JUnit 5", icon: "JUnit 5", categories: ["testing"], usedIn: ["DWatch"] },
  { name: "pytest", icon: "pytest", categories: ["testing"], usedIn: ["CVerify"] },
  { name: "Mockito", categories: ["testing"], usedIn: ["DWatch"] },
  { name: "Vitest", categories: ["testing"], usedIn: ["PQT"] },
  { name: "Testcontainers", icon: "Docker", categories: ["testing"], usedIn: ["PQT"] },

  // ── Infrastructure ───────────────────────────────────────────────────────
  {
    name: "Docker",
    icon: "Docker",
    categories: ["infrastructure"],
    usedIn: ["PQT", "CVerify"],
  },
  { name: "nginx", icon: "nginx", categories: ["infrastructure"], usedIn: ["CVerify"] },
  {
    name: "Google Cloud",
    icon: "Google Cloud",
    categories: ["infrastructure"],
    usedIn: ["CVerify"],
  },
  {
    name: "GitHub Actions",
    icon: "GitHub Actions",
    categories: ["infrastructure"],
    usedIn: ["CVerify"],
  },
  { name: "Maven", categories: ["infrastructure"], usedIn: ["DWatch"] },
  { name: "Git", icon: "Git", categories: ["infrastructure"], usedIn: ["All four"] },

  // ── AI ───────────────────────────────────────────────────────────────────
  { name: "Claude API", icon: "Claude", categories: ["ai"], usedIn: ["CVerify"] },
  { name: "Document extraction", categories: ["ai"], usedIn: ["CVerify"] },
  { name: "Static analysis", categories: ["ai"], usedIn: ["CVerify"] },
] as const;
