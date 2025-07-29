"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { experiences } from '@/lib/data';
import { DetailLayout, createExperienceActions, createExperienceMetadata } from '@/components/detail-layout';

export function ExperienceContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const experience = experiences.find(exp => exp.id === slug);

  useEffect(() => {
    async function loadContent() {
      if (experience?.id) {
        try {
          // Use API route instead of server action for better compatibility
          const response = await fetch(`/api/experience/${experience.id}/content`);
          if (response.ok) {
            const data = await response.json();
            // Process markdown content using markdown-it on client side
            const MarkdownIt = (await import('markdown-it')).default;
            const md = new MarkdownIt({
              html: true,
              breaks: true,
              linkify: true,
              typographer: true,
            });
            const html = md.render(data.content);
            setHtmlContent(html);
          } else {
            console.error('Failed to load content:', response.status);
            setHtmlContent('<p>Content not found</p>');
          }
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