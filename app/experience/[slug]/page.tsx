import { Suspense } from 'react';
import { experiences } from '@/lib/data';
import { ExperienceContent } from './experience-content';
import { DetailLayout } from '@/components/detail-layout';

export function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.id,
  }));
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
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
      <ExperienceContent slug={slug} />
    </Suspense>
  );
}