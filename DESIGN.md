# Design notes — TNL293107.github.io

## The brief in one line

The page has to say *"this person builds systems"*, not *"this person knows many
technologies"*. Every layout decision below follows from that.

---

## Direction

**Premium engineering portfolio × technical editorial × developer terminal.**

Near-black ground, warm off-white text, a single acid-lime accent, thin rules
forming a technical grid, and oversized display type carrying the hierarchy.
No glassmorphism, no glowing cards, no badge wall, no cyberpunk.

### Reference reading

Six sites were studied for language, not for copying:

| Source | What was taken |
|--------|----------------|
| animmasterlib.dev | Interaction vocabulary — which categories of motion exist and which are worth having (scroll reveal, mouse, hover, background) |
| pacomepertant.com | Restraint; lowercase micro-labels; repetition used as rhythm |
| aikawakenichi.com | The `0%` load counter as a committed, slightly experimental device |
| kaivian.github.io | A single editorial conceit carried consistently through metadata labels |
| vshslv.com | Technology stated plainly as a credibility signal |
| hirotosato0127.github.io | Metadata-per-entry (status, date, role) as structure |

The Instagram reference (`/p/DTDfiNADKMj/`) is login-gated. It resolves to an
`@animmaster_studio` UI-animation clip; its actual contents were **not**
visible and nothing was inferred from it.

The conceit chosen here is a **system record** — each project is a record with
consistent metadata (index, role, status), not a marketing card. That is the
honest equivalent of kaivian's newspaper framing for a backend engineer.

---

## Palette

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#080808` | Page ground |
| `--surface` / `--surface-2` | `#0e0e0e` / `#131313` | Cards, hover state |
| `--line` / `--line-soft` | `#242424` / `#1a1a1a` | The 1px technical grid |
| `--text` | `#f2efe6` | Warm off-white, never pure white |
| `--muted` | `#8f8e88` | Body copy — 6.1:1 |
| `--dim` | `#7c7b76` | Metadata — 4.7:1, the floor for real text |
| `--accent` | `#d7ff45` | Acid lime |

`--dim` started at `#64635f` and was raised after a contrast audit measured it at
**3.33:1** — below AA for the 10px footer and scroll label. Colour tokens are
constrained by measurement, not taste.

The contact section inverts to solid lime with black text, so the final CTA is
the highest-contrast thing on the page.

---

## Typography

- **Inter** — display and body. Display sizes run `clamp(3.25rem → 8rem)` with
  `-0.055em` tracking; tight tracking is what keeps large type from reading as a
  template.
- **DM Mono** — every piece of metadata: section numbers, project indices,
  status labels, tags, terminal, footer. Mono is the load-bearing signal that
  this is an engineer's page.
- **Georgia italic** — emphasis only (`that hold up.`, `worth shipping.`). Two
  words per section at most.

Two families total, per the performance budget.

---

## Layout

- 1180px shell, fluid gutter `clamp(1.25rem → 2.5rem)`.
- Hero is a 1.4fr / 0.75fr split: copy against a slightly rotated terminal panel.
- **Work uses deliberate hierarchy** rather than a uniform grid:
  - PQT and CVerify are full-width lead records with a two-column body
    (narrative on the left, an engineering fact list on the right).
  - DWatch and FU-Autokit share a two-column grid below them.
  - This is the single most important layout decision on the page — it makes the
    two strongest projects unmissable and stops all four reading as equal.
- PQT carries a `data → research → backtest → risk → execution` chain, lifted
  from its own README. It shows a dependency argument in one line of markup.
- CVerify carries an explicit contribution split ("82 commits are mine of 413")
  so team work is never presented as solo work.
- Stack is six bordered cells, grouped by role. No logos, no percentage bars.

---

## Motion inventory

| Effect | Implementation | Why it stays |
|--------|----------------|--------------|
| Intro counter | rAF counter 0→100 over 900 ms, once per session | Sets the terminal tone before content |
| Hero line reveal | `clip-path`-free overflow mask, two lines translating up | Establishes the headline as the entry point |
| Reveal on scroll | IntersectionObserver, 0.15 threshold | Paces the page |
| Terminal cascade | Staggered `transition-delay` per line | Makes the panel read as output |
| Cursor glow | rAF-throttled `translate3d` | Ambient depth, mouse-only |
| Card tilt | 1.8° maximum | Any more and it becomes a toy |
| Marquee | Two duplicated tracks, `translateX(-50%)` | Seamless; a single track would jump |
| Scroll progress | `scaleX` on a 2px rule | Technical, cheap, useful |

Everything animates `transform` and `opacity` only.

**Removed during review:** a stronger tilt, and per-character text splitting on
the headline. Both drew attention to the animation rather than the sentence.

---

## Responsive

| Breakpoint | Change |
|------------|--------|
| ≤1024px | Hero stacks, terminal un-rotates, project bodies go single-column, stack → 2 cols |
| ≤860px | Header collapses to a real toggle menu (not a hidden nav), project grid → 1 col, fact lists stack their labels |
| ≤560px | Stack → 1 col, buttons go full-width, terminal lines wrap instead of ellipsing |

Verified with no horizontal overflow and no off-canvas elements at 1440, 1280,
1024, 768 and 419px.

---

## Accessibility

- One `h1`; heading levels never skip.
- Skip link is the first focusable element.
- `:focus-visible` gives a 2px lime ring at 3px offset — confirmed to match on a
  real Tab press.
- The terminal is decorative markup wrapped in a single `role="img"` with a full
  `aria-label`, so screen readers get one clean sentence instead of prompt glyphs.
- All text passes WCAG AA, measured with translucent layers composited.
- Reduced motion disables the intro, grain, marquee, glow, tilt and all reveals.

---

## Content architecture

Hero → Selected Work (01–04) → About → Stack → Principles → Contact.

Work sits immediately after the hero because it is the strongest evidence.
Stack sits *after* About because the technologies are meant to read as
consequences of the work, not as the point.

### Facts removed for lack of a public source

- **GPA (8.6/10)** — CV only, and self-dating ("as of June 2026").
- **"45+ AI unit tests"** as an unattributed About-section metric — the figure is
  real (one CVerify commit adds 45 tests) so it now appears in the CVerify record
  where it is attributable, rather than floating as a headline number.
- **"10+ university portals"** — the FU-Autokit README says nine. Corrected.
- **"hundreds of student users"** — suggested by the original brief, supported by
  no public source. Omitted.
- **FU-Autokit "2023 — 2024"** — no date range is stated anywhere public; the
  repo is still being updated. Replaced with the version number.
- **DWatch "ratings/reviews"** — not a feature in the README. Replaced with the
  features that are (wishlist, comparison, guest order lookup).
