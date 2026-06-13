import type { Metadata } from "next";
import "@/styles/terminal.css";

export const metadata: Metadata = {
  title: "terminal",
  description:
    "The terminal view of Rui Valente's portfolio. ls, cd, cat, vim, themes, mini games and a suspicious amount of easter eggs. Built for developers.",
  openGraph: {
    title: "ruivalente.com — terminal edition",
    description:
      "Browse my portfolio like it's 1985: a fake unix with vim, tab completion, themes and mini games.",
    url: "https://ruivalente.com/terminal",
  },
  alternates: {
    canonical: "https://ruivalente.com/terminal",
  },
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
