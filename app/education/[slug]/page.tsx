import { Suspense } from 'react';
import { education } from '@/lib/data';
import { EducationContent } from './education-content';

export function generateStaticParams() {
  return education.map((edu) => ({
    slug: edu.id,
  }));
}

export default function EducationPage({ params }: { params: { slug: string } }) {
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
      <EducationContent slug={params.slug} />
    </Suspense>
  );
}