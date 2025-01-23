import { Suspense } from 'react';
import { experiences } from '@/lib/data';
import { ExperienceContent } from './experience-content';

export function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.id,
  }));
}

export default function ExperiencePage({ params }: { params: { slug: string } }) {
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
      <ExperienceContent slug={params.slug} />
    </Suspense>
  );
}