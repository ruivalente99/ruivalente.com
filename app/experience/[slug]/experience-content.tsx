"use client";

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import { experiences } from '@/lib/data';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

export function ExperienceContent({ slug }: { slug: string }) {
  const [htmlContent, setHtmlContent] = useState('');
  const router = useRouter();
  const experience = experiences.find(exp => exp.id === slug);

  useEffect(() => {
    if (experience?.content) {
      setHtmlContent(md.render(experience.content));
    } else {
      notFound();
    }
  }, [experience]);

  if (!experience) {
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
          <div>
            <h1 className="text-2xl font-bold">{experience.role}</h1>
            <p className="text-muted-foreground">{experience.company} • {experience.year}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Company
            </a>
          </Button>
        </div>
      </div>
      <Card className="p-8 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Card>
    </motion.div>
  );
}