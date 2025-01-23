import { Suspense } from 'react';
import { projects } from '@/lib/data';
import { ProjectContent } from './project-content';
import darkSideProjects from '@/lib/data/dark-side/projects.json';

export function generateStaticParams() {
  // Combine regular and dark side projects
  const allProjects = [
    ...projects.map(project => ({ slug: project.id })),
    ...darkSideProjects.projects.map(project => ({ slug: project.id }))
  ];
  
  return allProjects;
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8 px-4">
        <div className="p-8 animate-pulse bg-card rounded-lg">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    }>
      <ProjectContent slug={params.slug} />
    </Suspense>
  );
}