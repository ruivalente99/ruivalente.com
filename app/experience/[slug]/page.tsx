import { Suspense } from 'react';
import { experiences } from '@/lib/data';
import { ExperienceContent } from './experience-content';
import { DetailLayout } from '@/components/detail-layout';

export function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.id,
  }));
}

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <DetailLayout
        title=""
        isLoading={true}
      >
        <div />
      </DetailLayout>
    }>
      <ExperienceContent slug={params.slug} />
    </Suspense>
  );
}