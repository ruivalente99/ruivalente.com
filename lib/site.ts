/**
 * Single source of truth for the canonical origin.
 *
 * Production serves the site on https://www.ruivalente.com (the apex domain
 * 308-redirects to www in the Vercel project), so every canonical URL, sitemap
 * entry and structured-data URL must use that exact host. If the redirect
 * direction is ever flipped, change it here or set NEXT_PUBLIC_SITE_URL.
 */
const DEFAULT_SITE_URL = "https://www.ruivalente.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

export const SITE_NAME = "Rui Valente";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}
