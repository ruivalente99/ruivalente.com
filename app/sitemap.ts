import type { MetadataRoute } from "next";
import { projects, experiences, education } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

/**
 * Generated from the same data files that produce the pages, so a sitemap entry
 * can never point at a slug that does not exist. Only canonical, indexable URLs
 * are listed. <lastmod> is deliberately omitted: build-time timestamps are not
 * real modification dates, and Google discounts sitemaps that report them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/projects",
    ...projects.map((project) => `/projects/${project.id}`),
    "/experience",
    ...experiences.map((exp) => `/experience/${exp.id}`),
    "/education",
    ...education.map((edu) => `/education/${edu.id}`),
    "/stack",
    "/certificates",
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
