import { Suspense } from 'react';
import { education } from '@/lib/data';
import { EducationContent } from './education-content';
import { DetailLayout } from '@/components/detail-layout';

export function generateStaticParams() {
  return education.map((edu) => ({
    slug: edu.id,
  }));
}

export default async function EducationPage({ params }: { params: Promise<{ slug: string }> }) {
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
      <EducationContent slug={slug} />
    </Suspense>
  );
}