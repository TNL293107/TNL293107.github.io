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
| `styles.css` | Design tokens and every style rule, grouped into numbered layers |
| `script.js` | Reveal, count-up, cursor, magnets, work preview, stack cloud |
| `icons.js` | Technology marks (Simple Icons, CC0) as embedded path data |
| `favicon.svg` | Site icon |
| `shots/` | Project screenshots — see `shots/README.md` |

Total payload is roughly **70 KB** of local assets (about 20 KB over the wire
once GitHub Pages gzips it) plus three Google Fonts families — Instrument Serif
for display, Inter for body, DM Mono for metadata. `icons.js` is the largest
piece at 34 KB; it is embedded rather than fetched so the stack cloud costs no
network request and has no runtime dependency.

The work list is built on native `<details>` with the `name` attribute, so it is
an exclusive accordion that expands, collapses and takes keyboard focus **with
JavaScript disabled**. Links inside a collapsed record are correctly kept out of
the tab order by the browser.

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
- The nav stays visible at every width — no hamburger, nothing hidden behind a
  toggle. Below 430px the wordmark shortens to initials so the bar still fits.
- `prefers-reduced-motion: reduce` disables every reveal and expand transition —
  content renders immediately.
- Content never depends on JavaScript to become visible: the reveal class is
  added *by* JavaScript, and a timer forces everything visible after 2.5 s
  regardless of what the observer does.
- Project names are `<h3>` inside `<summary>`, so a screen-reader user can jump
  between projects from the heading list.

## Adding project screenshots

Each record has an image plate that currently renders as a drawn grid with the
project index. Drop an image inside and it takes over automatically:

```html
<figure class="plate" data-plate="01">
  <img src="shots/pqt.png" alt="PQT terminal showing service status" width="1200" height="900">
  <figcaption>PQT — terminal</figcaption>
</figure>
```

Use a 4:3 image, keep `width`/`height` on the tag so nothing shifts while it
loads, and write a real `alt`. No CSS change is needed — `.plate:has(img)` hides
the drawn fallback.
