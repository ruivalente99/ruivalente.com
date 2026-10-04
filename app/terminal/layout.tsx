import type { Metadata } from "next";
import "@/styles/terminal.css";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Terminal",
  description:
    "The terminal view of Rui Valente's portfolio: ls, cd, cat, vim, themes, mini games and a suspicious amount of easter eggs. Built for developers.",
  path: "/terminal",
});

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
