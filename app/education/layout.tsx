import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Education",
  description:
    "Education of Rui Valente: Informatics Engineering at UTAD, plus professional certificates in React, TypeScript, secure coding and project management.",
  path: "/education",
  additionalKeywords: ["Education", "Informatics Engineering", "UTAD"],
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
