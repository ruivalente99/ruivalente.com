import fs from "fs";
import path from "path";
import { projects, experiences, education } from "@/lib/data";
import { buildFileSystem } from "@/lib/terminal/build-fs";
import { Terminal } from "@/components/terminal/terminal";

function readContent(contentPath: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), contentPath), "utf8");
  } catch {
    return "";
  }
}

export default function TerminalPage() {
  const contentMap: Record<string, string> = {};
  [...projects, ...experiences, ...education].forEach((item: any) => {
    if (item.contentPath) contentMap[item.contentPath] = readContent(item.contentPath);
  });

  const root = buildFileSystem(contentMap);

  return <Terminal initialFs={root} />;
}
