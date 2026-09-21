"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { education } from '@/lib/data';
import { DetailLayout, createEducationActions, createEducationMetadata } from '@/components/detail-layout';

export function EducationContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const educationItem = education.find(edu => edu.id === slug);

  useEffect(() => {
    async function loadContent() {
      if (educationItem?.id) {
        try {
          // Use API route instead of server action for better compatibility
          const response = await fetch(`/api/education/${educationItem.id}/content`);
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
  }, [educationItem]);

  if (!educationItem) {
    notFound();
  }

  // Generate subject tags from the degree title
  const subjectTags = [
    'computer science',
    'software engineering', 
    'programming',
    'web development',
    educationItem.degree.toLowerCase().includes('master') ? 'advanced studies' : 'foundation'
  ];

  return (
    <DetailLayout
      title={educationItem.degree}
      subtitle={educationItem.school}
      year={educationItem.year}
      tags={subjectTags}
      actions={createEducationActions(educationItem.url)}
      metadata={createEducationMetadata(educationItem.school, educationItem.degree)}
      content={htmlContent}
      isLoading={isLoading}
      type="education"
    />
  );}

// Helper function to extract subjects from degree title
function extractSubjectsFromDegree(degree: string): string[] {
  const subjects = [];
  
  if (degree.toLowerCase().includes('informatics') || degree.toLowerCase().includes('computer')) {
    subjects.push('computer science', 'software engineering', 'programming');
  }
  
  if (degree.toLowerCase().includes('engineering')) {
    subjects.push('engineering', 'mathematics', 'problem solving');
  }
  
  if (degree.toLowerCase().includes('master')) {
    subjects.push('research', 'advanced studies');
  } else if (degree.toLowerCase().includes('bachelor')) {
    subjects.push('fundamentals', 'core concepts');
  }
  
  return subjects.slice(0, 4);
}