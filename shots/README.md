# Project screenshots

Drop screenshots here using these exact filenames. Each one replaces the drawn
placeholder plate in its project record on the site.

| File | Project | Status |
|------|---------|--------|
| `CVerify1.png` | CVerify | **Live** — landing hero |
| `CVerify2.png` | CVerify | **Live** — sign-in section |
| `FU-Autokit.png` | FU-Autokit | **Live** — extension popup |
| `DWatch.png` | DWatch | **Live** — storefront hero |
| `PQT.jpg` | PQT | **Unused** — see below |

`PQT.jpg` is a "COMING SOON" clipart, not a screenshot. It is left in the folder
but not referenced: bright purple cartoon lettering sits badly against a warm
paper page whose whole argument is that the work is serious. The record shows
the drawn plate instead, captioned "no screenshot yet", which says the same
thing without undercutting the page. Swap it in if you disagree — the markup is
one `<img>` tag.

## Specs

- **Any aspect ratio.** A plate holding an image keeps that image's own
  proportions, so nothing is cropped. Landscape browser captures work well.
- **PNG or WebP.** WebP is roughly half the size at the same quality; if you
  export WebP, change the extension in `index.html` too.
- **Keep each file under ~300 KB.** They are lazy-loaded and only fetched when
  a record is expanded, but the rest of the site is only ~70 KB.
- **Capture at roughly 1200px wide or more.** A plate renders about 458 CSS px
  across, which a high-DPI screen draws at ~916 device px. `DWatch.png` is only
  605px wide, so it is the one shot that will look soft on a retina display —
  worth re-taking from a wider browser window.
- **Crop out anything private** — real names, emails, student IDs, tokens,
  browser tabs with unrelated sites. These go on a public page.

## Wiring one up

Add the `<img>` inside the existing `<figure class="plate">` in `index.html`:

```html
<figure class="plate" data-plate="01">
  <img src="shots/pqt.png" alt="PQT terminal showing live service status"
       width="1600" height="1200" loading="lazy" decoding="async">
  <figcaption>PQT — terminal</figcaption>
</figure>
```

`width`/`height` stop the layout shifting while it loads, and `alt` should
describe what is on screen, not just repeat the project name. No CSS change is
needed — `.plate:has(img)` hides the drawn fallback automatically.
