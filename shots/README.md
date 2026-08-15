# Project screenshots

Drop screenshots here using these exact filenames. Each one replaces the drawn
placeholder plate in its project record on the site.

| File | Project | What to capture |
|------|---------|-----------------|
| `pqt.png` | PQT | The terminal UI — service status / instrument view |
| `cverify.png` | CVerify | A real screen from cverify.com.vn (dashboard or a report) |
| `dwatch.png` | DWatch | Storefront or the checkout / admin console |
| `fu-autokit.png` | FU-Autokit | The extension popup over a portal page |

## Specs

- **Aspect ratio 4:3** — the plate is 4:3, and anything else gets cropped by
  `object-fit: cover`. 1600×1200 is a good size.
- **PNG or WebP.** WebP is roughly half the size at the same quality; if you
  export WebP, change the extension in `index.html` too.
- **Keep each file under ~300 KB.** These load on every visit to an expanded
  record, and the whole site is currently ~60 KB.
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
