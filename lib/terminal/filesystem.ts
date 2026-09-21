export interface VFile {
  type: "file";
  name: string;
  content: string;
  /** primary link opened by `open <file>` */
  url?: string;
  hidden?: boolean;
  readOnly?: boolean;
}

export interface VDir {
  type: "dir";
  name: string;
  children: Record<string, VNode>;
  hidden?: boolean;
}

export type VNode = VFile | VDir;

export const HOME = "/home/guest";

export function dir(name: string, children: VNode[] = [], hidden = false): VDir {
  const map: Record<string, VNode> = {};
  children.forEach((c) => (map[c.name] = c));
  return { type: "dir", name, children: map, hidden };
}

export function file(
  name: string,
  content: string,
  opts: { url?: string; hidden?: boolean; readOnly?: boolean } = {}
): VFile {
  return { type: "file", name, content, ...opts };
}

/** Resolve a path (absolute, relative, ~ aware) into normalized absolute segments. */
export function resolvePath(cwd: string, input: string): string {
  let raw = input.trim();
  if (raw === "" || raw === "~") raw = HOME;
  else if (raw.startsWith("~/")) raw = HOME + raw.slice(1);
  const base = raw.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  const out = [...base];
  for (const seg of raw.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") out.pop();
    else out.push(seg);
  }
  return "/" + out.join("/");
}

export function getNode(root: VDir, absPath: string): VNode | null {
  const segs = absPath.split("/").filter(Boolean);
  let node: VNode = root;
  for (const seg of segs) {
    if (node.type !== "dir") return null;
    const next: VNode | undefined = node.children[seg];
    if (!next) return null;
    node = next;
  }
  return node;
}

export function displayPath(absPath: string): string {
  if (absPath === HOME) return "~";
  if (absPath.startsWith(HOME + "/")) return "~" + absPath.slice(HOME.length);
  return absPath || "/";
}

export function listDir(node: VDir, showHidden: boolean): VNode[] {
  return Object.values(node.children)
    .filter((c) => showHidden || !c.hidden)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

/**
 * Complete the last path segment of `partial` against the filesystem.
 * Returns full replacement candidates for the partial (dirs get a trailing "/").
 */
export function completePath(
  root: VDir,
  cwd: string,
  partial: string,
  onlyDirs: boolean
): string[] {
  const slash = partial.lastIndexOf("/");
  const basePart = slash >= 0 ? partial.slice(0, slash + 1) : "";
  const prefix = slash >= 0 ? partial.slice(slash + 1) : partial;
  const baseAbs = resolvePath(cwd, basePart === "" ? "." : basePart);
  const baseNode = getNode(root, baseAbs);
  if (!baseNode || baseNode.type !== "dir") return [];
  return Object.values(baseNode.children)
    .filter((c) => (!onlyDirs || c.type === "dir"))
    .filter((c) => (c.hidden ? prefix.startsWith(".") : true))
    .filter((c) => c.name.startsWith(prefix))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => basePart + c.name + (c.type === "dir" ? "/" : ""));
}

/** Render an ASCII tree of a directory. */
export function renderTree(node: VDir, showHidden = false, prefix = ""): string[] {
  const entries = listDir(node, showHidden);
  const out: string[] = [];
  entries.forEach((child, i) => {
    const last = i === entries.length - 1;
    const branch = last ? "└── " : "├── ";
    out.push(prefix + branch + child.name + (child.type === "dir" ? "/" : ""));
    if (child.type === "dir") {
      out.push(...renderTree(child, showHidden, prefix + (last ? "    " : "│   ")));
    }
  });
  return out;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}
