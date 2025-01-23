"use client";

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import { useTheme } from "next-themes";
import { useData } from "@/lib/hooks/useData";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
  content: string;
}

export function ProjectContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  
  // Use the appropriate API endpoint based on theme
  const endpoint = theme === 'dark-side' ? `/api/dark-side/projects` : '/api/projects';
  const { data: projects, isLoading } = useData<Project[]>(endpoint);
  
  const project = projects?.find(p => p.id === slug);

  useEffect(() => {
    if (project?.content) {
      setHtmlContent(md.render(project.content));
    } else if (!isLoading && !project) {
      notFound();
    }
  }, [project, isLoading]);

  if (isLoading) {
    return (
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
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4 mr-2" /> Demo
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> Source
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Card className="p-8 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Card>
    </motion.div>
  );
}