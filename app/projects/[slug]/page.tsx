import { Suspense } from 'react';
import { projects } from '@/lib/data';
import { ProjectContent } from './project-content';
import darkSideProjects from '@/lib/data/dark-side/projects.json';
import { DetailLayout } from '@/components/detail-layout';

export function generateStaticParams() {
  // Combine regular and dark side projects
  const allProjects = [
    ...projects.map(project => ({ slug: project.id })),
    ...darkSideProjects.projects.map(project => ({ slug: project.id }))
  ];
  
  return allProjects;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Suspense fallback={
      <DetailLayout
        title=""
        isLoading={true}
      >
        <div />
      </DetailLayout>
    }>
      <ProjectContent slug={slug} />
    </Suspense>
  );
}