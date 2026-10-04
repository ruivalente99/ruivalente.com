# SEO

How ruivalente.com is made discoverable by Google and other search engines, how to keep it that way, and what still has to be done outside the repository.

## Principles

- Crawlers must receive the real content in the first HTML response. Pages are server-rendered (statically generated at build time); client components receive their data from the server through `lib/data/initial-data.ts`, so nothing important depends on a client-side fetch.
- Content that users cannot see must not be shipped to crawlers. No hidden text, no invisible headings, no instructions aimed at AI systems.
- One canonical URL per page, on one canonical origin (see below).
- Structured data only describes what is visible on the page.

## Canonical origin

The Vercel project redirects `ruivalente.com` to `www.ruivalente.com` (308), so the canonical origin is `https://www.ruivalente.com`. It is defined once in `lib/site.ts` and used for canonicals, the sitemap, `robots.txt`, Open Graph URLs and JSON-LD.

If the redirect direction is ever changed in Vercel, change `DEFAULT_SITE_URL` in `lib/site.ts` (or set `NEXT_PUBLIC_SITE_URL`) in the same release. Canonicals must always point at the host that answers with `200`, never at a host that redirects.

## What is implemented

| Area | Implementation |
| :--- | :--- |
| Server rendering | `app/providers.tsx` renders on the server; `lib/hooks/useData.ts` reads server-provided initial data; detail pages read markdown at build time (`lib/markdown.ts`) |
| Titles and descriptions | `generatePageMetadata` in `lib/metadata.ts`; section layouts set unique titles and descriptions; detail pages use `generateMetadata` |
| Canonicals | Self-referencing per page via `generatePageMetadata({ path })`; the root layout deliberately sets none |
| Sitemap | `app/sitemap.ts`, generated from the data files; lists only real, indexable pages; no fake `lastmod` |
| robots | `app/robots.ts`: everything allowed, sitemap referenced; `/api/*` is kept out of the index with `X-Robots-Tag: noindex` in `next.config.js` |
| Headings | Exactly one `h1` per page; `#` headings inside markdown are demoted to `h2` |
| Breadcrumbs | `components/page-breadcrumbs.tsx` (visible trail plus `BreadcrumbList` JSON-LD) on every inner page |
| Internal links | Real `<a href>` links everywhere (footer, view-all links, cards); the audit crawls from `/` and fails on orphans |
| Images | Every image has alt text; the profile photo is a 12 KB WebP instead of the 2.2 MB original |
| Author bio | `/about`, the author box under case studies, and `Person` / `ProfilePage` JSON-LD, all generated from `lib/about.ts` |
| Errors | `notFound()` on the server returns real 404 status codes; `app/not-found.tsx` offers useful links |
| Hidden theme | The fictional dark-side detail pages are served but `noindex` and never listed in the sitemap |

## Adding a page

1. Create the route. Export metadata through `generatePageMetadata({ title, description, path })` (in the route's `layout.tsx` or `generateMetadata`). Descriptions: 70 to 160 characters, unique per page.
2. Render exactly one `h1`.
3. Add breadcrumbs with `PageBreadcrumbs`.
4. Link to the page with a normal `<Link href>` from at least one other page.
5. Add it to `app/sitemap.ts` (data-driven routes are picked up automatically).
6. Run `bun run build && bun run test:seo`.

## Verification

```bash
bun run quality        # typecheck, lint, unit tests (includes tests/seo.test.ts)
bun run build
bun run test:seo       # crawler's-eye audit of the production build (tests/seo-audit.ts)
bun run test:e2e       # accessibility and layout geometry across themes and viewports
```

`test:seo` checks status codes, title and description length and uniqueness, self-referencing canonicals, `noindex`, one `h1` and one `main`, alt text, JSON-LD validity, breadcrumbs, orphan pages, broken internal links, real 404s, single-hop trailing-slash redirects and the `/api` header. Set `TEST_URL` to audit a deployed preview.

## Search Console (manual, cannot be done from code)

1. Add a **Domain** property for `ruivalente.com` (DNS TXT verification). It covers both `www` and the apex, and every protocol. Alternatively add a URL-prefix property for `https://www.ruivalente.com` and verify it with the HTML tag by setting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel.
2. Sitemaps: submit `https://www.ruivalente.com/sitemap.xml`.
3. URL Inspection: run "Test live URL" on the home page and a case study, check that the rendered HTML contains the content, then "Request indexing". Repeat for `/about`, `/projects` and `/experience`.
4. Watch the Pages report for "Page with redirect", "Soft 404" and "Duplicate without user-selected canonical"; after this release they should drain as Google recrawls.
5. Confirm the production custom domain is publicly reachable without Vercel authentication (Vercel "Standard Protection" leaves custom production domains public; "All Deployments" protection would block Googlebot).

Indexing is not instant: expect days to a few weeks. Nobody can guarantee a ranking position or date.

## Backlinks

Links from other sites are earned, not configured. Realistic, legitimate sources: the GitHub profile and repository homepage fields, the LinkedIn profile website field, the Vercel/GitHub project descriptions of each case study, employer or university pages, and articles or talks. Avoid bought or exchanged links; they can trigger manual actions.

## Out of scope for this repository

`public/.well-known/ai-context.json`, `public/.well-known/ai-god-context.json` and `/api/ai-context` contain promotional claims written for AI systems. They are not part of the indexed pages, but they are public; consider replacing the claims with the same factual text used on `/about`.
