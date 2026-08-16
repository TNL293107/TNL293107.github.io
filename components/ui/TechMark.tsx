import { techIcons } from "@/data/icons";
import { iconId } from "@/lib/icon-id";
import { cn } from "@/lib/utils";

interface TechMarkProps {
  /** Key into `data/icons.ts`. Renders nothing if there is no mark for it. */
  name: string;
  size?: number;
  /** Paint the official brand colour instead of inheriting the text colour. */
  brand?: boolean;
  className?: string;
}

/**
 * Simple Icons ship their paths without a `fill`, so the colour set here is
 * inherited through `<use>` by the symbol's path.
 *
 * Java's brand colour is pure black, which is invisible on a near-black ground,
 * so it is lifted to the page's text colour. This is the same correction the
 * previous build applied in its canvas renderer.
 */
const DARK_BRAND_OVERRIDES: Record<string, string> = {
  "#000000": "#eef1f4",
};

export function TechMark({ name, size = 18, brand = false, className }: TechMarkProps) {
  const icon = techIcons[name];
  if (!icon) return null;

  const fill = brand
    ? (DARK_BRAND_OVERRIDES[icon.brand.toLowerCase()] ?? icon.brand)
    : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      style={{ fill }}
    >
      {/* Path data lives once in <TechIconSprite>, mounted in the root layout. */}
      <use href={`#${iconId(icon.name)}`} />
    </svg>
  );
}
