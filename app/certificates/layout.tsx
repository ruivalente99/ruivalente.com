import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Certificates",
  description:
    "Certificates earned by Rui Valente from Frontend Masters, Udemy and HackerRank in React, TypeScript, JavaScript, secure coding and project management.",
  path: "/certificates",
  additionalKeywords: ["Certificates", "Certifications"],
});

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
