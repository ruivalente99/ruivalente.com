"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { experiences } from '@/lib/data';
import { getMarkdownContentAction } from '@/lib/markdown-actions';
import { DetailLayout, createExperienceActions, createExperienceMetadata } from '@/components/detail-layout';

export function ExperienceContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const experience = experiences.find(exp => exp.id === slug);

  useEffect(() => {
    async function loadContent() {
      if (experience?.contentPath) {
        try {
          const content = await getMarkdownContentAction(experience.contentPath);
          setHtmlContent(content);
        } catch (error) {
          console.error('Error loading markdown content:', error);
          setHtmlContent('<p>Error loading content</p>');
        }
      }
      setIsLoading(false);
    }

    loadContent();
  }, [experience]);

  if (!experience) {
    notFound();
  }

  return (
    <DetailLayout
      title={`${experience.role} at ${experience.company}`}
      subtitle={experience.company}
      year={experience.year}
      tags={experience.skills || []}
      actions={createExperienceActions(experience.companyUrl)}
      metadata={createExperienceMetadata(experience.company)}
      content={htmlContent}
      isLoading={isLoading}
      type="experience"
    />
  );
}