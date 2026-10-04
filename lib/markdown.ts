import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

// Every page already has exactly one h1 (rendered by the page itself), so any
// "# heading" inside a case study is demoted to h2.
md.core.ruler.push("demote_h1", (state) => {
  for (const token of state.tokens) {
    if ((token.type === "heading_open" || token.type === "heading_close") && token.tag === "h1") {
      token.tag = "h2";
    }
  }
});

export function renderMarkdown(source: string): string {
  return md.render(source);
}

/** Reads a site-relative markdown path such as "/content/projects/papyrus.md". */
export function readMarkdownFile(contentPath: string): string | null {
  try {
    return fs.readFileSync(path.join(process.cwd(), contentPath), "utf8");
  } catch {
    return null;
  }
}

export function renderMarkdownFile(contentPath: string): string | null {
  const source = readMarkdownFile(contentPath);
  return source === null ? null : renderMarkdown(source);
}

/** First plain-text paragraph of a markdown document (skips headings, lists and tables). */
export function firstParagraph(source: string): string {
  const blocks = source.split(/\n\s*\n/);
  for (const block of blocks) {
    const text = block.trim();
    if (!text || /^(#|[-*+]\s|\d+\.\s|\||>|```)/.test(text)) continue;
    return text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  return "";
}
