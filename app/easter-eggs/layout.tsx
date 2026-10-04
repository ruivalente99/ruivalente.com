import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Easter eggs",
  description:
    "Hidden features of ruivalente.com: a unix-style terminal view of the portfolio, mini games and a few surprises for curious developers.",
  path: "/easter-eggs",
});

export default function EasterEggsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
