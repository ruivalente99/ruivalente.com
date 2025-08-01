"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
}

export function ProjectsSection() {
  const router = useRouter();
  const { data: projects, isLoading } = useData<Project[]>('/api/projects');

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (!projects) return null;

  // Show only first 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <Card className="h-full p-4" role="region" aria-labelledby="featured-projects-heading">
      <header className="flex items-center justify-between mb-4">
        <h2 id="featured-projects-heading" className="text-sm font-bold">featured projects</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/projects')}
          className="text-xs"
          aria-label="View all projects"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            role="listitem"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-lg bg-muted/50 cursor-pointer"
              onClick={() => router.push(`/projects/${project.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/projects/${project.id}`);
                }
              }}
              aria-label={`View project: ${project.title}`}
            >
            <div className="aspect-video overflow-hidden relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <Globe className="w-3 h-3 mr-1" aria-hidden="true" /> demo
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="w-3 h-3 mr-1" aria-hidden="true" /> github
                  </a>
                </Button>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
            </div>
            </motion.div>
          </article>
        ))}
      </div>
    </Card>
  );
}

function ProjectsSkeleton() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <Skeleton className="aspect-video" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}