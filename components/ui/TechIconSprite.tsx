import { techIcons } from "@/data/icons";
import { iconId } from "@/lib/icon-id";

/**
 * Defines every technology mark once, as `<symbol>`s that `TechMark` then
 * references with `<use>`.
 *
 * Why it exists: the marks are rendered 60+ times across the stack marquee (which
 * duplicates its sequence to loop seamlessly) and the skill grid. Inlining the
 * path data at each site put ~100KB of duplicated `d` attributes into the HTML —
 * about a third of the document. The sprite ships each path once.
 *
 * `display: none` is deliberately avoided: several browsers refuse to resolve
 * `<use>` into a hidden subtree. The zero-size absolute box is the pattern that
 * works everywhere.
 */
export function TechIconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
    >
      <defs>
        {Object.values(techIcons).map((icon) => (
          <symbol key={icon.name} id={iconId(icon.name)} viewBox="0 0 24 24">
            <path d={icon.path} />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
