"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { education } from '@/lib/data';
import { getMarkdownContentAction } from '@/lib/markdown-actions';
import { DetailLayout, createEducationActions, createEducationMetadata } from '@/components/detail-layout';

export function EducationContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const educationItem = education.find(edu => edu.id === slug);

  useEffect(() => {
    async function loadContent() {
      if (educationItem?.contentPath) {
        try {
          const content = await getMarkdownContentAction(educationItem.contentPath);
          setHtmlContent(content);
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
    'Computer Science',
    'Software Engineering', 
    'Programming',
    'Web Development',
    educationItem.degree.includes('Master') ? 'Advanced Studies' : 'Foundation'
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
    subjects.push('Computer Science', 'Software Engineering', 'Programming');
  }
  
  if (degree.toLowerCase().includes('engineering')) {
    subjects.push('Engineering', 'Mathematics', 'Problem Solving');
  }
  
  if (degree.toLowerCase().includes('master')) {
    subjects.push('Research', 'Advanced Studies');
  } else if (degree.toLowerCase().includes('bachelor')) {
    subjects.push('Fundamentals', 'Core Concepts');
  }
  
  return subjects.slice(0, 4);
}