import { Suspense } from 'react';
import { education } from '@/lib/data';
import { EducationContent } from './education-content';
import { DetailLayout } from '@/components/detail-layout';

export function generateStaticParams() {
  return education.map((edu) => ({
    slug: edu.id,
  }));
}

export default function EducationPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <DetailLayout
        title=""
        isLoading={true}
      >
        <div />
      </DetailLayout>
    }>
      <EducationContent slug={params.slug} />
    </Suspense>
  );
}