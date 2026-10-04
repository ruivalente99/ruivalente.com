import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { education } from "@/lib/data";
import darkSideEducation from "@/lib/data/dark-side/education.json";
import { DetailLayout } from "@/components/detail-layout";
import { createEducationActions, createEducationMetadata } from "@/components/detail-helpers";
import { JsonLd } from "@/components/json-ld";
import { generatePageMetadata, truncateDescription } from "@/lib/metadata";
import { firstParagraph, readMarkdownFile, renderMarkdown } from "@/lib/markdown";
import { webPageJsonLd } from "@/lib/structured-data";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

interface DarkSideEducation {
  id: string;
  degree: string;
  school: string;
  year: string;
  url?: string;
  content?: string;
}

// Entries of the fictional dark-side easter-egg theme; served but kept out of the index.
const darkSideItems = darkSideEducation.education as DarkSideEducation[];

export function generateStaticParams() {
  return [...education, ...darkSideItems].map((edu) => ({ slug: edu.id }));
}

function describe(degree: string, school: string, year: string, source: string | null) {
  const summary = source ? firstParagraph(source) : "";
  return truncateDescription(`${degree} at ${school} (${year}). ${summary}`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const darkSide = darkSideItems.find((edu) => edu.id === slug);
  if (darkSide) {
    return generatePageMetadata({
      title: darkSide.degree,
      absoluteTitle: true,
      description: truncateDescription(`${darkSide.degree} at ${darkSide.school} (${darkSide.year}).`),
      path: `/education/${darkSide.id}`,
      noIndex: true,
    });
  }
  const item = education.find((edu) => edu.id === slug);
  if (!item) return {};

  return generatePageMetadata({
    title: `${item.degree} - ${SITE_NAME}`,
    absoluteTitle: true,
    description: describe(item.degree, item.school, item.year, readMarkdownFile(item.contentPath)),
    path: `/education/${item.id}`,
  });
}

export default async function EducationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const darkSide = darkSideItems.find((edu) => edu.id === slug);
  if (darkSide) {
    const path = `/education/${darkSide.id}`;
    return (
      <DetailLayout
        title={darkSide.degree}
        subtitle={darkSide.school}
        year={darkSide.year}
        actions={darkSide.url ? createEducationActions(darkSide.url) : []}
        content={renderMarkdown(darkSide.content ?? `${darkSide.degree} at ${darkSide.school} (${darkSide.year}).`)}
        type="education"
        showAuthor={false}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Education", path: "/education" },
          { name: darkSide.degree, path },
        ]}
      />
    );
  }

  const item = education.find((edu) => edu.id === slug);
  if (!item) notFound();

  const path = `/education/${item.id}`;
  const source = readMarkdownFile(item.contentPath);

  // Subject tags derived from the degree title
  const subjectTags = [
    "computer science",
    "software engineering",
    "programming",
    "web development",
    item.degree.toLowerCase().includes("master") ? "advanced studies" : "foundation",
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd(path, item.degree, describe(item.degree, item.school, item.year, source))} />
      <DetailLayout
        title={item.degree}
        subtitle={item.school}
        year={item.year}
        tags={subjectTags}
        actions={createEducationActions(item.url)}
        metadata={createEducationMetadata(item.school, item.degree)}
        content={source ? renderMarkdown(source) : "<p>Details coming soon.</p>"}
        type="education"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Education", path: "/education" },
          { name: item.degree, path },
        ]}
        related={{
          heading: "more education",
          links: education
            .filter((edu) => edu.id !== item.id)
            .map((edu) => ({ href: `/education/${edu.id}`, label: edu.degree })),
        }}
      />
    </>
  );
}
