/**
 * Every factual claim here is traceable to a public source: the GitHub
 * profile, each repository's README, or the upstream CVerify commit
 * history. Nothing is added that a reader could not verify.
 */

export type Shot = { src: string; w: number; h: number; alt: string; caption: string };

export type Project = {
  index: string;
  name: string;
  kicker: string;
  state: string;
  blurb: string;
  facts: { label: string; body: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  shots: Shot[];
  /** Which shot the hover preview uses, when a project has several. */
  peek?: string;
  note?: string;
};

export const person = {
  name: 'Trần Nhất Long',
  short: 'TNL',
  handle: 'TNL293107',
  role: 'Backend Engineer',
  place: 'Đà Nẵng, Việt Nam',
  email: 'long293107@gmail.com',
  github: 'https://github.com/TNL293107',
  linkedin: 'https://www.linkedin.com/in/tr%E1%BA%A7n-nh%E1%BA%A5t-long-a78122325/',
  status: 'Open to internships',
  headline: ['I build systems', 'that hold up.'],
  lede: 'Backend services, data models, and the infrastructure they run on.',
};

export const numbers = [
  { value: 295, label: 'tests written across four projects' },
  { value: 9, label: 'university portals automated' },
  { value: 82, label: 'of 413 commits on CVerify' },
  { value: 1, label: 'system running in production' },
];

export const projects: Project[] = [
  {
    index: '01',
    name: 'PQT',
    kicker: 'Quant research terminal',
    state: 'In development',
    blurb:
      'A Bloomberg-inspired research workstation for the Vietnamese market. The point is the closed loop — if the data is wrong, nothing downstream can be trusted.',
    facts: [
      { label: 'Shape', body: 'Modular monolith — .NET backend, React terminal, separate Python and C++ toolchains' },
      { label: 'Care', body: 'Point-in-time correctness; provider symbols are aliases, never keys' },
      { label: 'Proof', body: '163 tests across four suites; they skip loudly rather than pass silently' },
    ],
    stack: ['C#', 'ASP.NET Core', 'PostgreSQL', 'Redis', 'React', 'C++', 'Docker'],
    links: [{ label: 'Repository', href: 'https://github.com/TNL293107/PQT' }],
    shots: [
      { src: '/shots/PQT.jpg', w: 512, h: 512, alt: 'Placeholder mark while PQT is still being built.', caption: 'PQT — in development' },
    ],
  },
  {
    index: '02',
    name: 'CVerify',
    kicker: 'Developer verification platform',
    state: 'In production',
    blurb:
      "Checks what a CV claims against the candidate's actual code. Static analysis for complexity, MinHash LSH for clone detection, Claude for evaluation.",
    note: '82 of 413 commits are mine. A five-person capstone — this is the part I owned.',
    facts: [
      { label: 'AI service', body: 'Candidate evaluation and JD matching pipelines end to end, document extraction, 45 unit tests' },
      { label: 'Infra', body: 'Moved the deploy from AWS EC2 to GCP, split app and API subdomains, got auto-deploy actually firing' },
      { label: 'Fixes', body: 'Made container logs reach Cloud Logging; fixed OAuth linking; cut one page from 22 requests' },
    ],
    stack: ['Python', 'FastAPI', 'Claude API', 'C#', 'GCP', 'nginx', 'Docker'],
    links: [
      { label: 'Live site', href: 'https://cverify.io.vn' },
      { label: 'Team repository', href: 'https://github.com/fptu-se-su26/swp391-su26-ai-audit-project-swp391_se20a02_group-05' },
    ],
    shots: [
      { src: '/shots/CVerify1.png', w: 1712, h: 821, alt: "CVerify landing page: 'Hiring based on proof, not claims.'", caption: 'CVerify — landing' },
      { src: '/shots/CVerify2.png', w: 1568, h: 649, alt: 'CVerify sign-in section with Engineer and Business tabs.', caption: 'CVerify — sign-in' },
    ],
    peek: '/shots/CVerify2.png',
  },
  {
    index: '03',
    name: 'DWatch',
    kicker: 'Java commerce platform',
    state: 'Independent',
    blurb:
      'A watch store on plain Servlet/JSP — no framework to hide behind. Cart, VietQR checkout, guest order lookup, admin console.',
    facts: [
      { label: 'Security', body: 'Moved live passwords to BCrypt on first login with no lockouts; CSRF tokens across 17 forms' },
      { label: 'Proof', body: '54 JUnit 5 tests on mocked DAOs — the suite needs no database' },
    ],
    stack: ['Java 17', 'Servlet/JSP', 'SQL Server', 'JUnit 5', 'Mockito'],
    links: [{ label: 'Repository', href: 'https://github.com/TNL293107/DWatch' }],
    shots: [
      { src: '/shots/DWatch.png', w: 1912, h: 710, alt: 'DWatch storefront with search, category nav and hero.', caption: 'DWatch — storefront' },
    ],
  },
  {
    index: '04',
    name: 'FU-Autokit',
    kicker: 'Browser extension, 9 portals',
    state: 'v3.4',
    blurb:
      'Removes the daily friction of university systems: one credential store, nine portals, and the arithmetic students were doing by hand.',
    facts: [
      { label: 'Reach', body: 'Auto-login across FAP, CMS, EduNext, FLM, Library, DNG, OCD, OJTMS and Coursera' },
      { label: 'Privacy', body: 'Credentials stay in chrome.storage. No backend, nothing leaves the browser' },
    ],
    stack: ['JavaScript', 'Manifest V3', 'Service worker', 'i18n'],
    links: [{ label: 'Repository', href: 'https://github.com/TNL293107/FU-Autokit' }],
    shots: [
      { src: '/shots/FU-Autokit.png', w: 846, h: 583, alt: 'FU-Autokit popup with portal shortcuts and credential fields.', caption: 'FU-Autokit — popup' },
    ],
  },
];

export const stack = [
  { label: 'Languages', body: 'C# · Java · Python · TypeScript · SQL' },
  { label: 'Backend', body: 'ASP.NET Core · EF Core · FastAPI · Servlet/JSP' },
  { label: 'Data', body: 'PostgreSQL · SQL Server · Redis' },
  { label: 'Testing', body: 'xUnit · JUnit 5 · pytest · Testcontainers' },
  { label: 'Infra', body: 'Docker · nginx · GCP · GitHub Actions' },
  { label: 'AI', body: 'Claude API · document extraction · static analysis' },
];

export const about = {
  statement: 'I like problems where the hard part is the data model and the flow, not the screen.',
  paragraphs: [
    'Software Engineering student at FPT University Đà Nẵng. Most of what I build started as something that annoyed me.',
    'The half I enjoy is unglamorous — why logs never reached the logging backend, why an OAuth callback dropped a cookie. That is usually where a system is actually broken.',
  ],
};
