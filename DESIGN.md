# Design notes — tnl293107.github.io

## The brief in one line

The page has to say *"this person builds systems"* — and it has to do it without
reading like the GitHub profile README it is drawn from.

---

## What changed, and why

The first build was a dark, mono-heavy, terminal-styled page. It was rejected for
two specific reasons, both correct:

1. **Too much text.** Every project carried a description, a four-row fact list,
   three bullets and a tag row — all of it on screen at once.
2. **Too close to the GitHub profile README.** Same order, same sections, same
   phrasing. The dark terminal styling reinforced the impression: it looked like
   a GitHub page, not a portfolio.

Both are fixed structurally rather than cosmetically.

| | Before | After |
|---|---|---|
| Visible text at rest | ~7,000 chars | **~1,600 chars** |
| Page length | 7.8 screens | 4.6 screens |
| Ground | near-black `#080808` | warm paper `#fdf8f3` |
| Display face | Inter, tight sans | Instrument Serif |
| Work section | four always-open essays | four collapsed records |
| Stack | six cards of prose | canvas of technology marks |

The text reduction comes from **collapsing detail behind `<details>`**, not from
deleting substance. Every fact from the previous build is still there — it opens
on demand, one record at a time.

---

## Reference reading

| Source | What was taken |
|--------|----------------|
| avivashishta.com | The density target. It carries ~2,300 characters over seven screens; that measurement, not its look, drove the rewrite. Also the stats band and the canvas-driven skills section. |
| animmasterlib.dev | Interaction vocabulary — which categories of motion are worth having. |
| pacomepertant.com | Restraint; lowercase micro-labels; repetition as rhythm. |
| kaivian.github.io | One editorial conceit carried consistently through metadata labels. |
| vshslv.com | Technology stated plainly as a credibility signal. |
| hirotosato0127.github.io | Per-entry metadata (status, role) as structure. |

Checked but unusable: the Instagram post is login-gated. It resolves to an
`@animmaster_studio` UI-animation clip; its contents were never visible and
nothing was inferred from it.

**Not copied:** avivashishta's orange-on-cream palette, its DM Serif/DM Sans
pairing, and its trailing-period naming device. The reference's *approach* is
borrowed; its identity is not.

---

## Palette

| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#fdf8f3` | Warm ground |
| `--paper-2` | `#f5eee4` | Inset surfaces |
| `--ink` | `#14110e` | Warm near-black — 17.8:1 |
| `--muted` | `#6b6258` | Body copy — 5.7:1 |
| `--rule` / `--rule-2` | `#e2d8ca` / `#d2c5b2` | The 1px grid |
| `--accent` | `#2440e0` | Cobalt — 6.9:1 |

Cobalt rather than the reference's orange: it reads technical instead of
friendly, and it keeps the page from being mistaken for its source.

Every text pair was measured with translucent layers composited, and with
`color(srgb …)` notation handled — an early audit reported two false failures
because that notation uses 0–1 floats rather than 0–255.

---

## Typography

- **Instrument Serif** — display. `clamp(3.5rem → 9rem)`, tracking `-0.02em`.
- **Inter** — body and UI.
- **DM Mono** — every label, index, state and caption.

Mono metadata against a serif display is what keeps an editorial page legibly an
*engineer's* page.

---

## Motion inventory

| Effect | Implementation | Guard |
|--------|----------------|-------|
| Word-by-word heading reveal | Words wrapped in JS, masked, staggered 42 ms | reduced-motion |
| Block reveal | IntersectionObserver + 2.6 s backstop | reduced-motion |
| Number count-up | rAF, cubic ease-out, with a timeout that forces the true value | reduced-motion |
| Marquee | Two duplicated tracks, `translateX(-50%)` | reduced-motion |
| Scroll progress | `scaleX` on a 2px rule | — |
| Custom cursor | Lerped dot, scales over interactive elements | fine pointer only |
| Magnetic buttons | Pointer-weighted translate | fine pointer only |
| Work preview | Plate glides after the pointer over collapsed rows | fine pointer only |
| Record expansion | WAAPI stagger on the contents | reduced-motion |
| **Stack cloud** | Canvas: 20 technology marks drifting, pointer-repelled, draggable | reduced-motion |

### The stack cloud

The showpiece, and the direct answer to "more effects". Inspection of
avivashishta.com found **no animation library at all** — its liveliness comes
from three canvases. This is the same idea, built in ~150 lines of vanilla:

- Circular bodies, velocity damping, pointer repulsion, pairwise separation.
- Marks are Simple Icons paths (CC0) drawn via `Path2D`, embedded in `icons.js`
  so there is **no network request and no runtime dependency**.
- Ink monochrome at rest; a mark fades to its brand colour as the pointer nears
  it or while it is dragged. Full brand colour on all twenty at once would be a
  badge wall — exactly what this page is trying not to be.
- The simulation only runs while the section is on screen.
- `touch-action: pan-y`, and dragging is mouse-only, so it never eats a scroll.
- **One frame is drawn synchronously on build.** rAF is throttled in background
  tabs, so the loop alone would leave a blank canvas until the tab got focus.

Its label text lives in a visually-hidden `<dl>` that screen readers, search
engines and no-JS visitors get in full; hovering or tapping a mark prints its
name below the canvas.

---

## Accessibility

- One `h1`; `h2` per section; each project is an `h3` **inside its `<summary>`**,
  so a screen-reader user can jump between projects from the heading list.
- The work list is native `<details name="work">` — an exclusive accordion that
  expands, collapses and takes keyboard focus **with JavaScript disabled**.
  Links inside a collapsed record are correctly kept out of the tab order.
- All text passes WCAG AA.
- Nav is visible at every width; no hamburger. Below 430px the wordmark drops to
  initials so the bar still fits on one line.
- Reduced motion removes the cursor, the preview, the marquee and the entire
  canvas — not just their durations.
- Nothing content-bearing is hidden without JavaScript: the `.rise` class that
  hides an element is added *by* JavaScript, and a 2.6 s timer forces everything
  visible regardless of what the observer does.

---

## Content architecture

Hero → marquee → numbers → work (01–04) → about → stack → contact.

The numbers band sits directly under the hero because it is the fastest honest
signal available: 295 tests, 9 portals, 82 of 413 commits, 1 system in
production. Stack sits after About so the technologies read as a consequence of
the work rather than as the point of it.

### Facts removed for lack of a public source

- **GPA (8.6/10)** — CV only, and self-dating.
- **"10+ university portals"** — the README says nine.
- **"hundreds of student users"** — no public source.
- **DWatch "ratings/reviews"** — not a feature in the README.
- **FU-Autokit "2023 — 2024"** — no public date range; replaced with the version.

`45 unit tests` survives, but only inside the CVerify record where it is
attributable to a specific commit, rather than floating as a headline number.
