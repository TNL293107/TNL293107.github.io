import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required under `output: export` — metadata routes are dynamic by default,
// and a static export has no server to evaluate them at request time.
export const dynamic = "force-static";

/** Single-page site, so the sitemap has exactly one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
