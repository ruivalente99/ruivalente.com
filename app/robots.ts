import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Everything is crawlable. Googlebot (and every other crawler) falls under "*".
// JSON endpoints under /api are kept out of the index with an X-Robots-Tag
// header (see next.config.js) rather than a Disallow, so crawlers can still
// fetch anything a page needs to render.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
