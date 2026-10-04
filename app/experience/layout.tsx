import type { Metadata } from "next";
import { experiences } from "@/lib/data";
import { generatePageMetadata, truncateDescription } from "@/lib/metadata";

const companies = experiences.map((exp) => exp.company);
const companyList = `${companies.slice(0, -1).join(", ")} and ${companies[companies.length - 1]}`;

export const metadata: Metadata = generatePageMetadata({
  title: "Experience",
  description: truncateDescription(
    `Frontend engineering experience of Rui Valente at ${companyList}. React, TypeScript, Next.js and GraphQL in production.`
  ),
  path: "/experience",
  additionalKeywords: ["Work Experience", "Career"],
});

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
