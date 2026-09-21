"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Github, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
  skills?: string[];
}

export function ProjectsSection() {
  const router = useRouter();
  const { data: projects, isLoading } = useData<Project[]>("/api/projects");
  const { t } = useI18n();
  const [pageIndex, setPageIndex] = useState(0);

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (!projects || projects.length === 0) return null;

  const pageSize = 2;
  const totalPages = Math.ceil(projects.length / pageSize);
  const currentProjects = projects.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <Card
      className="h-full p-4 flex flex-col justify-between overflow-hidden"
      role="region"
      aria-labelledby="featured-projects-heading"
    >
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2
            id="featured-projects-heading"
            className="text-xs font-semibold lowercase tracking-wider text-muted-foreground"
          >
            {t.bento.projects.title.toLowerCase()}
          </h2>
          {totalPages > 1 && (
            <div className="flex items-center gap-1 bg-muted/40 px-1.5 py-0.5 rounded-md border border-border/40 text-[10px] font-mono text-muted-foreground">
              <span>{pageIndex + 1}</span>
              <span className="opacity-40">/</span>
              <span>{totalPages}</span>
              <div className="flex items-center ml-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  aria-label="previous projects"
                >
                  <ChevronLeft className="w-3 h-3" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  aria-label="next projects"
                >
                  <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/projects")}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96] lowercase"
          aria-label={t.bento.projects.viewAll.toLowerCase()}
        >
          <span className="lowercase">{t.bento.projects.viewAll.toLowerCase()}</span>{" "}
          <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto">
        {currentProjects.map((project) => {
          const displaySkills = (project.skills || []).slice(0, 3);

          return (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-muted/25 hover:bg-muted/55 border border-border/40 transition-all duration-200 active:scale-[0.99] shadow-2xs flex flex-col justify-between h-full"
            >
              <div className="aspect-[16/9] w-full overflow-hidden relative rounded-t-xl bg-muted/40 shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-t-xl pointer-events-none" />
              </div>

              <div className="p-3 flex flex-col justify-between flex-1 min-h-0">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 h-5 shrink-0">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                      <Link
                        href={`/projects/${project.id}`}
                        className="focus:outline-none focus-visible:underline"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {project.title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed h-10 overflow-hidden">
                    {project.description}
                  </p>

                  <div className="h-6 mb-2.5 flex items-center gap-1 overflow-hidden shrink-0">
                    {displaySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-foreground/85 border border-border/30 shrink-0 truncate max-w-[120px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-border/30 shrink-0 h-8">
                  <div className="flex items-center gap-1.5 relative z-10">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 px-2 rounded-lg bg-background/80 hover:bg-background border border-border/50 text-[11px] font-medium flex items-center gap-1 text-foreground/80 hover:text-foreground transition-all duration-150 active:scale-[0.94] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`View live demo of ${project.title} (opens in new tab)`}
                    >
                      <Globe className="w-3 h-3 opacity-70" aria-hidden="true" />
                      <span>{t.bento.projects.demo}</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 px-2 rounded-lg bg-background/80 hover:bg-background border border-border/50 text-[11px] font-medium flex items-center gap-1 text-foreground/80 hover:text-foreground transition-all duration-150 active:scale-[0.94] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                    >
                      <Github className="w-3 h-3 opacity-70" aria-hidden="true" />
                      <span>{t.bento.projects.source}</span>
                    </a>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-foreground pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </article>
          );
        })}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
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