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

  // Show top 2 featured projects for a generous, spacious layout in the 3-column span
  const featuredProjects = projects.slice(0, 2);

  return (
    <Card className="h-full p-4 flex flex-col justify-between" role="region" aria-labelledby="featured-projects-heading">
      <header className="flex items-center justify-between mb-3">
        <h2 id="featured-projects-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          featured projects
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/projects')}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96]"
          aria-label="View all projects"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto" role="list">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            role="listitem"
          >
            <div
              className="group relative overflow-hidden rounded-xl bg-muted/25 hover:bg-muted/55 border border-border/40 transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-2xs flex flex-col justify-between h-full"
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
              <div className="aspect-[16/9] overflow-hidden relative rounded-t-xl bg-muted/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-t-xl" />
              </div>
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight mb-1 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/30">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-7 px-2.5 rounded-lg bg-background/80 hover:bg-background border border-border/50 text-[11px] font-medium flex items-center gap-1 text-foreground/80 hover:text-foreground transition-all duration-150 active:scale-[0.94] shadow-2xs"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <Globe className="w-3 h-3 opacity-70" aria-hidden="true" />
                      <span>demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-7 px-2.5 rounded-lg bg-background/80 hover:bg-background border border-border/50 text-[11px] font-medium flex items-center gap-1 text-foreground/80 hover:text-foreground transition-all duration-150 active:scale-[0.94] shadow-2xs"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <Github className="w-3 h-3 opacity-70" aria-hidden="true" />
                      <span>github</span>
                    </a>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-foreground" aria-hidden="true" />
                </div>
              </div>
            </div>
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