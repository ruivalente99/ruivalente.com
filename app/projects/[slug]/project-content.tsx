"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useTheme } from "next-themes";
import { useData } from "@/lib/hooks/useData";
import { getMarkdownContentAction } from '@/lib/markdown-actions';
import { DetailLayout, createProjectActions, createProjectMetadata } from '@/components/detail-layout';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
  contentPath: string;
  technologies?: string[];
}

export function ProjectContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [contentLoading, setContentLoading] = useState(true);
  const { theme } = useTheme();
  
  const endpoint = theme === 'dark-side' 
    ? '/api/dark-side/projects' 
    : '/api/projects';
  
  const { data: projects, isLoading } = useData<Project[]>(endpoint);
  const project = projects?.find((p: Project) => p.id === slug);

  useEffect(() => {
    async function loadContent() {
      if (project?.contentPath) {
        try {
          const content = await getMarkdownContentAction(project.contentPath);
          setHtmlContent(content);
        } catch (error) {
          console.error('Error loading markdown content:', error);
          setHtmlContent('<p>Error loading content</p>');
        }
      }
      setContentLoading(false);
    }

    loadContent();
  }, [project]);

  if (isLoading || contentLoading) {
    return <DetailLayout isLoading={true} title="" type="project" />;
  }

  if (!project) {
    notFound();
  }

  // Extract technologies for tags (prioritize technologies array, then description)
  const extractTechnologiesFromDescription = (text: string): string[] => {
    const techKeywords = [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'AI', 
      'Machine Learning', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes',
      'GraphQL', 'REST', 'API', 'Frontend', 'Backend', 'Full Stack', 'Mobile',
      'Web Development', 'Cloud', 'DevOps', 'CI/CD', 'Testing', 'Agile'
    ];
    
    return techKeywords.filter(tech => 
      text.toLowerCase().includes(tech.toLowerCase())
    ).slice(0, 6);
  };

  const technologies = project?.technologies || 
    extractTechnologiesFromDescription(project?.description || '');

  return (
    <DetailLayout
      title={project.title}
      subtitle={project.description}
      tags={technologies}
      actions={createProjectActions(project.demo, project.github)}
      metadata={createProjectMetadata(technologies)}
      content={htmlContent}
      isLoading={false}
      type="project"
    />
  );
}