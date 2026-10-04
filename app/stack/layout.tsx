import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tech stack",
  description:
    "The technologies Rui Valente works with every day: React, TypeScript, Next.js, Node.js, Tailwind CSS, developer tooling and AI coding assistants.",
  path: "/stack",
  additionalKeywords: ["Tech Stack", "Skills", "Tooling"],
});

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
