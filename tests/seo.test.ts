import { describe, test, expect } from "bun:test";
import fs from "fs";
import path from "path";

import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { projects, experiences, education } from "../lib/data";
import darkSideProjects from "../lib/data/dark-side/projects.json";
import { SITE_URL, absoluteUrl } from "../lib/site";
import { generatePageMetadata, truncateDescription } from "../lib/metadata";
import { renderMarkdown, firstParagraph } from "../lib/markdown";
import { breadcrumbJsonLd, homeJsonLd, personNode } from "../lib/structured-data";
import { author } from "../lib/about";

const root = path.join(import.meta.dir, "..");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe("Canonical origin", () => {
  test("SITE_URL is an https origin without a trailing slash", () => {
    expect(SITE_URL.startsWith("https://")).toBe(true);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  test("absoluteUrl builds canonical URLs", () => {
    expect(absoluteUrl("/")).toBe(SITE_URL);
    expect(absoluteUrl("/projects")).toBe(`${SITE_URL}/projects`);
    expect(absoluteUrl("projects")).toBe(`${SITE_URL}/projects`);
    expect(absoluteUrl("https://example.com/x")).toBe("https://example.com/x");
  });
});

describe("Sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  test("has no duplicates and only canonical-origin URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) expect(url.startsWith(SITE_URL)).toBe(true);
  });

  test("lists every real page generated from data", () => {
    const expected = [
      "/",
      "/about",
      "/projects",
      "/experience",
      "/education",
      "/stack",
      "/certificates",
      ...projects.map((p) => `/projects/${p.id}`),
      ...experiences.map((e) => `/experience/${e.id}`),
      ...education.map((e) => `/education/${e.id}`),
    ].map(absoluteUrl);
    for (const url of expected) expect(urls).toContain(url);
  });

  test("never lists slugs that do not exist or hidden easter-egg pages", () => {
    for (const bad of ["lazylife", "openvia", "neoception"]) {
      expect(urls.some((url) => url.endsWith(`/${bad}`))).toBe(false);
    }
    for (const dark of darkSideProjects.projects) {
      expect(urls).not.toContain(absoluteUrl(`/projects/${dark.id}`));
    }
    expect(urls).not.toContain(absoluteUrl("/easter-eggs"));
  });

  test("does not report fake modification dates", () => {
    for (const entry of entries) expect(entry.lastModified).toBeUndefined();
  });
});

describe("robots", () => {
  const config = robots();

  test("allows crawling the whole site and points to the sitemap", () => {
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    for (const rule of rules) {
      expect(rule.allow).toBe("/");
      expect(rule.disallow).toBeUndefined();
    }
    expect(config.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  test("no static robots.txt in /public (it would shadow app/robots.ts)", () => {
    expect(fs.existsSync(path.join(root, "public", "robots.txt"))).toBe(false);
  });
});

describe("Page metadata helper", () => {
  test("builds self-referencing canonical and og:url from a path", () => {
    const meta = generatePageMetadata({ title: "T", description: "D", path: "/projects/papyrus" });
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/projects/papyrus`);
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/projects/papyrus`);
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  test("uses absolute image URLs for social previews", () => {
    const meta = generatePageMetadata({ title: "T", description: "D", path: "/" });
    const images = meta.openGraph?.images as Array<{ url: string; width: number; height: number }>;
    expect(images[0].url.startsWith("https://")).toBe(true);
    expect([images[0].width, images[0].height]).toEqual([1200, 630]);
  });

  test("supports absolute titles and explicit noindex", () => {
    const meta = generatePageMetadata({
      title: "Full title",
      description: "D",
      path: "/x",
      absoluteTitle: true,
      noIndex: true,
    });
    expect(meta.title).toEqual({ absolute: "Full title" });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  test("truncateDescription keeps snippets within limits at a word boundary", () => {
    const long = "word ".repeat(80);
    const out = truncateDescription(long, 158);
    expect(out.length).toBeLessThanOrEqual(158);
    expect(out.endsWith("...")).toBe(true);
    expect(truncateDescription("short text")).toBe("short text");
  });
});

describe("Markdown rendering", () => {
  test("demotes h1 so every page keeps exactly one h1", () => {
    const html = renderMarkdown("# Title\n\n## Section\n\ntext");
    expect(html).not.toContain("<h1");
    expect(html).toContain("<h2>Title</h2>");
  });

  test("firstParagraph skips headings and strips markdown", () => {
    const text = firstParagraph("## Overview\n\nAs a **Frontend Engineer** at [Acme](https://x.y), I build things.\n\n- item");
    expect(text).toBe("As a Frontend Engineer at Acme, I build things.");
  });
});

describe("Structured data", () => {
  test("breadcrumbs use absolute URLs and 1-based positions", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]) as { itemListElement: Array<{ position: number; item: string }> };
    expect(data.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(data.itemListElement[1].item).toBe(`${SITE_URL}/projects`);
  });

  test("person data is factual: no superlatives or self-declared deity claims", () => {
    const json = JSON.stringify([homeJsonLd(), personNode(), author]);
    expect(json).not.toMatch(/\bgod\b|deity|godlike|supreme|legendary|omnipotent/i);
    expect(personNode().sameAs.length).toBeGreaterThan(0);
  });
});

describe("Regression guards for crawlability", () => {
  const sources = [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))].filter(
    (file) => /\.tsx?$/.test(file)
  );

  test("no content is hidden from users while exposed to crawlers", () => {
    for (const file of sources) {
      const source = fs.readFileSync(file, "utf8");
      expect(/className="sr-only"\s+aria-hidden="true"/.test(source)).toBe(false);
      expect(/Hidden AI/i.test(source)).toBe(false);
      expect(/name="ai-[a-z-]+"/.test(source)).toBe(false);
    }
  });

  test("root layout does not force one canonical onto every page", () => {
    const layout = fs.readFileSync(path.join(root, "app", "layout.tsx"), "utf8");
    expect(layout).not.toContain("canonical");
    expect(layout).not.toContain("your-actual-google-verification-code-here");
  });

  test("the providers render children on the server (no mount gate)", () => {
    const providers = fs.readFileSync(path.join(root, "app", "providers.tsx"), "utf8");
    expect(providers).not.toMatch(/if \(!mounted\)\s*\{?\s*return null/);
  });

  test("noindex is only used for the fictional dark-side detail pages", () => {
    const allowed = new Set(
      ["projects", "experience", "education"].map((section) =>
        path.join(root, "app", section, "[slug]", "page.tsx")
      )
    );
    for (const file of sources) {
      const source = fs.readFileSync(file, "utf8");
      if (/noIndex:\s*(true|darkSide)|index:\s*false|noindex/i.test(source)) {
        expect(allowed.has(file)).toBe(true);
      }
    }
  });
});
