import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import darkSideProjects from "@/lib/data/dark-side/projects.json";
import { DetailLayout } from "@/components/detail-layout";
import { createProjectActions, createProjectMetadata } from "@/components/detail-helpers";
import { JsonLd } from "@/components/json-ld";
import { generatePageMetadata, truncateDescription } from "@/lib/metadata";
import { renderMarkdown, renderMarkdownFile } from "@/lib/markdown";
import { webPageJsonLd } from "@/lib/structured-data";
import { SITE_NAME } from "@/lib/site";

// Unknown slugs must be real 404s, not empty shells.
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.id })),
    ...darkSideProjects.projects.map((project) => ({ slug: project.id })),
  ];
}

function findProject(slug: string) {
  const project = projects.find((item) => item.id === slug);
  if (project) return { project, darkSide: false as const };
  const darkSide = darkSideProjects.projects.find((item) => item.id === slug);
  if (darkSide) return { project: darkSide, darkSide: true as const };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) return {};
  const { project, darkSide } = found;

  return generatePageMetadata({
    title: darkSide ? project.title : `${project.title} case study - ${SITE_NAME}`,
    absoluteTitle: true,
    description: truncateDescription(project.description),
    path: `/projects/${project.id}`,
    // The dark-side entries belong to a fictional easter-egg theme, not to the portfolio.
    noIndex: darkSide,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) notFound();

  const { darkSide } = found;
  const path = `/projects/${found.project.id}`;

  if (darkSide) {
    const project = darkSideProjects.projects.find((item) => item.id === slug)!;
    return (
      <DetailLayout
        title={project.title}
        subtitle={project.description}
        actions={createProjectActions(project.demo, project.github)}
        content={renderMarkdown(project.content)}
        type="project"
        image={project.image}
        showAuthor={false}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path },
        ]}
      />
    );
  }

  const project = projects.find((item) => item.id === slug)!;
  const html = renderMarkdownFile(project.contentPath) ?? `<p>${project.description}</p>`;
  const others = projects.filter((item) => item.id !== project.id);

  return (
    <>
      <JsonLd data={webPageJsonLd(path, `${project.title} case study`, project.description)} />
      <DetailLayout
        title={project.title}
        subtitle={project.description}
        tags={project.skills}
        actions={createProjectActions(project.demo, project.github)}
        metadata={createProjectMetadata(project.skills)}
        content={html}
        type="project"
        image={project.image}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path },
        ]}
        related={{
          heading: "more projects",
          links: others.map((item) => ({ href: `/projects/${item.id}`, label: item.title })),
        }}
      />
    </>
  );
}
