/**
 * Icon names are human labels ("C#", ".NET", "SQL Server"), which are not valid
 * as DOM ids. This maps them to a stable, collision-free id used by the sprite
 * and by every `<use>` reference.
 */
export function iconId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `tech-${slug}`;
}
