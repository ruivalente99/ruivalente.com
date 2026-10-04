import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { generatePageMetadata, truncateDescription } from "@/lib/metadata";

const featured = projects.slice(0, 3).map((project) => project.title).join(", ");

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: truncateDescription(
    `Software projects by Rui Valente: ${featured} and more. Case studies built with React, TypeScript, Next.js and Tailwind CSS.`
  ),
  path: "/projects",
  additionalKeywords: ["Software Projects", "Case Studies", "Portfolio Projects"],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
