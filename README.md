# TNL293107.github.io

Personal engineering profile for **Trần Nhất Long** — Software Engineering
student at FPT University Đà Nẵng, working on backend services, data models, AI
pipelines and the infrastructure they run on.

Live at **https://tnl293107.github.io/**

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS v4 (CSS-first tokens in `app/globals.css`) |
| Animation | GSAP 3 + `@gsap/react`, ScrollTrigger, SplitText |
| Smooth scroll | Lenis (one global instance) |
| Components | React Bits (vendored source, MIT) |
| Fonts | Space Grotesk, Inter, JetBrains Mono — self-hosted via `next/font` |

No Framer Motion, no Motion One. GSAP is the only animation runtime.

## Layout

```
app/          layout, page, globals.css, robots.ts, sitemap.ts
components/
  layout/     Navbar, Footer, SmoothScroll, RevealController
  sections/   one file per page section
  projects/   project card variants
  skills/     filterable grid, stack marquee
  ui/         shared primitives (cards, pills, marks, buttons)
  reactbits/  vendored React Bits source — see note below
data/         all page content, typed against types/
lib/          gsap setup, hooks, utilities
public/       screenshots, favicon
legacy/       the previous hand-written static site, kept for reference
```

Content is fully data-driven: adding a project or a skill means editing `data/`,
never a component.

### Server vs client components

Every section is a Server Component. Interactivity is pushed into the few leaves
that need it — the skill filter, magnetic buttons, the count-up, the hero
headline split, and the two controllers in `components/layout/`. Scroll
entrances work by marking elements with `data-reveal` in server-rendered markup;
a single client controller animates them.

### React Bits

React Bits distributes source rather than a package, so the components live in
`components/reactbits/` under their MIT licence. They are **modified** — each
change is marked with an `ADAPTED:` comment. The modifications cover
reduced-motion bailouts, removing hardcoded colours that fought the design
tokens, and satisfying `noUncheckedIndexedAccess`.

Only components with no `motion` dependency were used. `ElectricBorder` and
`LogoLoop` are lazy-loaded via `next/dynamic` because both sit below the fold.

## Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

```bash
npm run lint       # eslint (flat config, eslint-config-next 16 native)
npm run typecheck  # tsc --noEmit
npm run build      # static export to out/
```

## Deploying

`next.config.ts` sets `output: "export"`, so the build emits a fully static
`out/`. `.github/workflows/deploy.yml` runs lint, typecheck and build on every
push to `main`, then publishes `out/` to GitHub Pages.

**One-time setup:** in **Settings → Pages**, set **Source** to **GitHub
Actions**. The old "deploy from a branch" mode serves the repository root and
would ignore the build.

The workflow writes `out/.nojekyll` because Pages otherwise runs the output
through Jekyll, which strips underscore-prefixed paths — including Next's
`_next/` bundle directory.

---

## Content policy

Every factual claim traces to a public source, and the sources were checked
directly rather than recalled:

- **GitHub** — profile README, repository READMEs, commit history, and the
  actual source trees. This is the authority for what each project is and does.
- **The upstream CVerify repository** — used via the contributors API and commit
  history to establish real contribution scope, rather than the README team
  table, which understates it.
- **The CV** — treated as an older snapshot and the authority *only* for
  credentials, which no repository can evidence. Where the CV disagreed with
  GitHub about the code, GitHub won.

Deliberately **not** on the page: employers, internships, user counts, revenue,
uptime, benchmarks, or trading results. No public source supports any of them.

Claims dropped during the rewrite because the source tree contradicted them:
DWatch vouchers, ratings/reviews, an analytics dashboard and brute-force rate
limiting; CVerify's Tesseract dependency; and pgvector.

Numbers on the page and where they come from:

| Claim | Source |
|-------|--------|
| 297 tests total | 163 PQT + 45 CVerify + 56 DWatch + 33 FU-Autokit |
| CVerify: 82 of 413 commits | GitHub contributors API + commit count on `main` |
| DWatch: 56 tests, CSRF across 17 forms | `@Test`/`@ParameterizedTest` count across five test classes |
| FU-Autokit: 9 portals, v3.4 | FU-Autokit README |

## Accessibility

- Semantic landmarks, one `h1`, no skipped heading levels (verified in-browser).
- Skip link as the first focusable element.
- All text meets WCAG AA, measured rather than eyeballed. The faintest colour
  shipped is `#79838e` at 5.17:1.
- Focus rings are immediate: `:focus-visible` sets `transition-duration: 0s`,
  because Tailwind's `transition-colors` includes `outline-color` and would
  otherwise fade the ring in over 300ms.
- The mobile menu traps focus, closes on Escape, and returns focus to its
  toggle.
- `prefers-reduced-motion: reduce` disables Lenis, the reveal system, the
  headline split, the typing line, the marquee and the animated border — not
  just their durations.
- Content never depends on JavaScript to become visible: the CSS that hides
  reveal targets is scoped to a class that JavaScript adds, and a 3s timer
  forces everything visible regardless of what the observer does.

## Known gaps

- **No resume PDF.** `resumeUrl` in `data/site.ts` is `null`; every resume
  affordance falls back to "request by email". Drop a file in `public/resume/`
  and set that constant to switch them all to a real download.
- **No PQT screenshot.** The project is still being built, so its card shows a
  status mark rather than a fabricated capture.
- **No credential verification links.** The CV carries no URLs;
  `Certification.href` exists for the day a real one does.
