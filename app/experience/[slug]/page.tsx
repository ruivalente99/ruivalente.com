import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences } from "@/lib/data";
import darkSideExperience from "@/lib/data/dark-side/experience.json";
import { DetailLayout } from "@/components/detail-layout";
import { createExperienceActions, createExperienceMetadata } from "@/components/detail-helpers";
import { JsonLd } from "@/components/json-ld";
import { generatePageMetadata, truncateDescription } from "@/lib/metadata";
import { firstParagraph, readMarkdownFile, renderMarkdown } from "@/lib/markdown";
import { webPageJsonLd } from "@/lib/structured-data";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

interface DarkSideExperience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  year: string;
  achievements?: string[];
  content?: string;
}

// Entries of the fictional dark-side easter-egg theme; served but kept out of the index.
const darkSideItems = darkSideExperience.experiences as DarkSideExperience[];

export function generateStaticParams() {
  return [...experiences, ...darkSideItems].map((exp) => ({ slug: exp.id }));
}

function describe(role: string, company: string, year: string, source: string | null) {
  const summary = source ? firstParagraph(source) : "";
  return truncateDescription(`${role} at ${company} (${year}). ${summary}`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const darkSide = darkSideItems.find((exp) => exp.id === slug);
  if (darkSide) {
    return generatePageMetadata({
      title: `${darkSide.role} at ${darkSide.company}`,
      absoluteTitle: true,
      description: truncateDescription(`${darkSide.role} at ${darkSide.company} (${darkSide.year}).`),
      path: `/experience/${darkSide.id}`,
      noIndex: true,
    });
  }
  const experience = experiences.find((exp) => exp.id === slug);
  if (!experience) return {};

  return generatePageMetadata({
    title: `${experience.role} at ${experience.company} - ${SITE_NAME}`,
    absoluteTitle: true,
    description: describe(
      experience.role,
      experience.company,
      experience.year,
      readMarkdownFile(experience.contentPath)
    ),
    path: `/experience/${experience.id}`,
  });
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const darkSide = darkSideItems.find((exp) => exp.id === slug);
  if (darkSide) {
    const path = `/experience/${darkSide.id}`;
    const title = `${darkSide.role} at ${darkSide.company}`;
    const achievements = (darkSide.achievements ?? []).map((item) => `- ${item}`).join("\n");
    const source = [darkSide.content, achievements].filter(Boolean).join("\n\n");
    return (
      <DetailLayout
        title={title}
        subtitle={darkSide.company}
        year={darkSide.year}
        actions={createExperienceActions(darkSide.companyUrl)}
        metadata={createExperienceMetadata(darkSide.company)}
        content={renderMarkdown(source || `${title} (${darkSide.year}).`)}
        type="experience"
        showAuthor={false}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
          { name: title, path },
        ]}
      />
    );
  }

  const experience = experiences.find((exp) => exp.id === slug);
  if (!experience) notFound();

  const path = `/experience/${experience.id}`;
  const source = readMarkdownFile(experience.contentPath);
  const title = `${experience.role} at ${experience.company}`;

  return (
    <>
      <JsonLd
        data={webPageJsonLd(
          path,
          title,
          describe(experience.role, experience.company, experience.year, source)
        )}
      />
      <DetailLayout
        title={title}
        subtitle={experience.company}
        year={experience.year}
        tags={experience.skills || []}
        actions={createExperienceActions(experience.companyUrl)}
        metadata={createExperienceMetadata(experience.company)}
        content={source ? renderMarkdown(source) : "<p>Details coming soon.</p>"}
        type="experience"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
          { name: title, path },
        ]}
        related={{
          heading: "more experience",
          links: experiences
            .filter((item) => item.id !== experience.id)
            .map((item) => ({ href: `/experience/${item.id}`, label: `${item.role} at ${item.company}` })),
        }}
      />
    </>
  );
}
