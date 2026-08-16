import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// See the note in sitemap.ts — metadata routes must opt into static generation.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
