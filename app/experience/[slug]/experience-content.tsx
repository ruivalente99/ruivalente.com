"use client";

import { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import MarkdownIt from "markdown-it";
import { experiences } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export function ExperienceContent({ slug }: { slug: string }) {
  const router = useRouter();
  const experience = experiences.find((exp) => exp.id === slug);

  const { data: markdownContent, isLoading, error } = useQuery({
    queryKey: ["markdownContent", slug],
    queryFn: async () => {
      if (!experience?.contentPath) {
        throw new Error("Content path not found.");
      }
      const response = await fetch(experience.contentPath);
      if (!response.ok) {
        throw new Error("Failed to fetch Markdown content.");
      }
      return response.text();
    },
    enabled: !!experience?.contentPath, // Ensure the query only runs if the contentPath exists
  });

  useEffect(() => {
    if (!experience) {
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
            <p className="text-muted-foreground">
              {experience.company} • {experience.year}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Company
            </a>
          </Button>
        </div>
      </div>
      <Card className="p-8 prose dark:prose-invert max-w-none">
        {isLoading ? (
          <p>Loading content...</p>
        ) : error ? (
          <p>Error loading content: {error.message}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: md.render(markdownContent!) }} />
        )}
      </Card>
    </motion.div>
  );
}
