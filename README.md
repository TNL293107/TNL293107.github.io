# TNL293107.github.io

Personal portfolio for **Trần Nhất Long** — Software Engineering student at FPT
University Đà Nẵng, working mainly on backend services, data models and infrastructure.

Live at **https://TNL293107.github.io/**

---

## Stack

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies.

| File | Purpose |
|------|---------|
| `index.html` | All markup and metadata (SEO, Open Graph, JSON-LD) |
| `styles.css` | Design tokens and every style rule, grouped into 15 numbered layers |
| `script.js` | Reveal-on-scroll, intro counter, cursor glow, card tilt, mobile nav |
| `favicon.svg` | Site icon |

Total payload is roughly **24 KB** of local assets plus two Google Fonts families
(Inter, DM Mono). Georgia is used for italic emphasis and ships with the OS.

---

## Running it locally

Any static file server works. With Python:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`. A `.claude/launch.json` is included so the
same server can be started from the editor.

---

## Deploying to GitHub Pages

1. Create a repository named exactly `TNL293107.github.io`.
2. Push the contents of this folder to the `main` branch.
3. **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**.
4. The site publishes at `https://TNL293107.github.io/`.

No workflow file is needed — GitHub Pages serves the root directly.

---

## Content policy

Everything factual on this page is traceable to a public source, and the sources
were checked directly rather than recalled:

- **GitHub profile and repository READMEs** — the primary source for what each
  project is, which technologies it uses, and its current status.
- **The upstream CVerify repository** (`fptu-se-su26/swp391-su26-ai-audit-project-swp391_se20a02_group-05`)
  — used to establish the actual scope of contribution, via the contributors API
  and commit history, rather than the summary role listed in the team table.
- **The CV** is treated as an older snapshot. Where it disagreed with GitHub,
  GitHub won.

Deliberately **not** on the page: employers, internships, awards, user counts,
revenue, uptime figures, or any metric no public source supports. Two numbers
that appeared in earlier drafts (a GPA figure and a project date range) were
removed because neither could be verified from a public source — see
`DESIGN.md` for the list.

Numbers that *are* on the page and where they come from:

| Claim | Source |
|-------|--------|
| PQT: 163 tests, phase 1 of 20 | PQT README |
| CVerify: 82 of 413 commits | GitHub contributors API + commit count on `main` |
| CVerify: 45 unit tests | commit `restore missing imports + add 45 unit tests…` |
| DWatch: 54 tests, CSRF across 17 forms | DWatch README + profile README |
| FU-Autokit: 9 portals, 33 tests, v3.4 | FU-Autokit README + profile README |

---

## Accessibility

- Semantic landmarks, one `h1`, no skipped heading levels.
- Skip link as the first focusable element.
- All text meets WCAG AA contrast (verified by compositing translucent
  backgrounds, not by eyeballing it).
- Keyboard-operable mobile menu with `aria-expanded` and Escape to close.
- `prefers-reduced-motion: reduce` disables the intro counter, grain, marquee,
  cursor glow, tilt and every reveal transition — content renders immediately.
- Content never depends on JavaScript to become visible: the reveal styles apply
  only when the `js` class is present, and a timer forces everything visible
  after 2.5 s regardless of what the animation hooks do.
