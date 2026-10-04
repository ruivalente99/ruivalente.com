/**
 * Crawler's-eye audit of the production build.
 *
 * Fetches pages the way a search engine does before running any JavaScript and
 * checks what actually ends up in the HTML: status codes, titles, descriptions,
 * canonicals, headings, images, structured data, internal links and headers.
 *
 *   bun run build && bun run test:seo
 *
 * Set TEST_URL to audit an already running server (for example a preview URL);
 * otherwise `next start` is launched on a free local port.
 */
import { spawn, type ChildProcess } from "child_process";
import { SITE_URL } from "../lib/site";

const PORT = Number(process.env.SEO_TEST_PORT || 3101);

let failures = 0;
function check(ok: boolean, label: string, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${!ok && detail ? `  -> ${detail}` : ""}`);
}

async function isUp(url: string) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function start(): Promise<{ base: string; child?: ChildProcess }> {
  if (process.env.TEST_URL) return { base: process.env.TEST_URL.replace(/\/$/, "") };
  const base = `http://127.0.0.1:${PORT}`;
  if (await isUp(base)) return { base };
  const child = spawn("bun", ["x", "next", "start", "-p", String(PORT)], { stdio: "ignore" });
  for (let i = 0; i < 60; i++) {
    if (await isUp(base)) return { base, child };
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill();
  throw new Error("server did not start; run `bun run build` first");
}

const decode = (s: string) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

interface Page {
  status: number;
  html: string;
  headers: Headers;
}

const cache = new Map<string, Page>();
async function get(base: string, route: string): Promise<Page> {
  const hit = cache.get(route);
  if (hit) return hit;
  const res = await fetch(base + route, { redirect: "manual" });
  const page = { status: res.status, html: await res.text(), headers: res.headers };
  cache.set(route, page);
  return page;
}

const stripScripts = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");

function internalLinks(html: string): string[] {
  const body = stripScripts(html);
  const out = new Set<string>();
  for (const m of Array.from(body.matchAll(/<a\s[^>]*href="([^"]+)"/g))) {
    const href = decode(m[1]);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (clean) out.add(clean.length > 1 ? clean.replace(/\/$/, "") : clean);
  }
  return Array.from(out);
}

async function main() {
  const { base, child } = await start();
  console.log(`Auditing ${base} (canonical origin ${SITE_URL})\n`);

  try {
    // robots.txt
    const robotsRes = await get(base, "/robots.txt");
    check(robotsRes.status === 200, "robots.txt returns 200");
    check(!/^\s*Disallow:\s*\/\s*$/im.test(robotsRes.html), "robots.txt does not disallow the whole site");
    check(robotsRes.html.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt points to the sitemap");

    // sitemap.xml
    const sitemapRes = await get(base, "/sitemap.xml");
    check(sitemapRes.status === 200, "sitemap.xml returns 200");
    const locs = Array.from(sitemapRes.html.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => decode(m[1]));
    check(locs.length > 0, `sitemap lists ${locs.length} URLs`);
    check(new Set(locs).size === locs.length, "sitemap has no duplicate URLs");
    check(locs.every((l) => l === SITE_URL || l.startsWith(`${SITE_URL}/`)), "every sitemap URL uses the canonical origin");
    const routes = locs.map((l) => {
      const pathname = new URL(l).pathname;
      return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    });

    // per-page checks
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();
    for (const route of routes) {
      const page = await get(base, route);
      const head = page.html.slice(0, page.html.indexOf("</head>"));
      const body = stripScripts(page.html.slice(page.html.indexOf("<body")));
      const tag = (re: RegExp) => {
        const m = head.match(re);
        return m ? decode(m[1]) : "";
      };
      const title = tag(/<title>([^<]*)<\/title>/);
      const description = tag(/<meta name="description" content="([^"]*)"/);
      const canonical = tag(/<link rel="canonical" href="([^"]*)"/);
      const robots = tag(/<meta name="robots" content="([^"]*)"/);
      const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

      check(page.status === 200, `${route}: 200 without redirect`, String(page.status));
      check(title.length >= 10 && title.length <= 70, `${route}: title length ${title.length}`, title);
      check(description.length >= 70 && description.length <= 160, `${route}: description length ${description.length}`);
      check(
        canonical === (route === "/" ? SITE_URL : `${SITE_URL}${route}`),
        `${route}: canonical is self-referencing`,
        canonical
      );
      check(!/noindex/i.test(robots), `${route}: indexable`, robots);
      check((body.match(/<h1[\s>]/g) || []).length === 1, `${route}: exactly one h1`);
      check((body.match(/<main[\s>]/g) || []).length === 1, `${route}: exactly one main landmark`);
      check(text.length >= 300, `${route}: ${text.length} characters of server-rendered text`);
      check(!/aria-hidden="true"[^>]*>\s*<h1/.test(body), `${route}: h1 is not hidden from assistive tech`);

      const imgs = Array.from(body.matchAll(/<img\b[^>]*>/g)).map((m) => m[0]);
      const missingAlt = imgs.filter((img) => !/\balt="[^"]+"/.test(img));
      check(missingAlt.length === 0, `${route}: all ${imgs.length} images have alt text`, missingAlt[0]);

      const ld = Array.from(page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
      let ldOk = true;
      for (const block of ld) {
        try {
          JSON.parse(block[1]);
        } catch {
          ldOk = false;
        }
      }
      check(ldOk && (route === "/terminal" || ld.length > 0), `${route}: ${ld.length} valid JSON-LD block(s)`);
      if (route !== "/") {
        check(
          ld.some((b) => b[1].includes("BreadcrumbList")),
          `${route}: has BreadcrumbList structured data`
        );
      }

      check(!titles.has(title), `${route}: title is unique`, `also used by ${titles.get(title)}`);
      check(!descriptions.has(description), `${route}: description is unique`, `also used by ${descriptions.get(description)}`);
      titles.set(title, route);
      descriptions.set(description, route);
    }

    // internal links: no orphans and no broken links
    const reached = new Set<string>(["/"]);
    const queue = ["/"];
    const broken: string[] = [];
    while (queue.length) {
      const route = queue.shift()!;
      const page = await get(base, route);
      for (const link of internalLinks(page.html)) {
        if (link.startsWith("/_next") || link.startsWith("/api") || link.startsWith("/.well-known")) continue;
        if (/\.[a-z0-9]{2,5}$/i.test(link)) continue; // static files
        if (reached.has(link)) continue;
        reached.add(link);
        const target = await get(base, link);
        if (target.status !== 200) broken.push(`${link} (${target.status}) linked from ${route}`);
        else queue.push(link);
      }
    }
    check(broken.length === 0, `no broken internal links (${reached.size} URLs crawled)`, broken.join("; "));
    const orphans = routes.filter((r) => !reached.has(r));
    check(orphans.length === 0, "every sitemap URL is reachable from the home page via plain links", orphans.join(", "));

    // real 404s instead of soft 404s
    for (const bad of ["/projects/openvia", "/experience/openvia", "/education/nope", "/does-not-exist"]) {
      const page = await get(base, bad);
      check(page.status === 404, `${bad}: real 404 status`, String(page.status));
    }

    // trailing slash resolves in a single hop
    const slash = await fetch(`${base}/projects/`, { redirect: "manual" });
    const hop = slash.headers.get("location") || "";
    check(
      slash.status === 308 && !hop.endsWith("/"),
      "/projects/ redirects once to /projects",
      `${slash.status} ${hop}`
    );

    // JSON endpoints stay out of the index; hidden theme pages too
    const api = await get(base, "/api/projects");
    check(/noindex/i.test(api.headers.get("x-robots-tag") || ""), "/api/* responses carry X-Robots-Tag: noindex");
    const dark = await get(base, "/projects/death-star");
    check(/noindex/i.test(dark.html), "dark-side easter-egg pages are noindex");
  } finally {
    child?.kill();
  }

  console.log(failures ? `\n${failures} check(s) failed` : "\nAll SEO checks passed");
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
