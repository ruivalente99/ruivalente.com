"use client";

import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { ArrowLeft, Github, Globe, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const router = useRouter();
  const { data: projects, isLoading } = useData<any[]>('/api/projects');

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-background text-foreground p-4 lowercase">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 lowercase"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            back
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">no projects found</h2>
            <p className="text-muted-foreground">projects will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground lowercase">
        {/* Harmonized Hero Section */}
        <header className="relative border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6 relative z-10">
            <div className="reveal-up">
              <PageBreadcrumbs
                className="mb-4"
                crumbs={[
                  { name: "Home", path: "/" },
                  { name: "Projects", path: "/projects" },
                ]}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="group mb-6 -ml-2 text-muted-foreground hover:text-foreground active:scale-[0.96] transition-all lowercase"
                aria-label="back to previous view"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
                <span>back</span>
              </Button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-muted/60 border border-border/50 text-muted-foreground">
                  <span className="lowercase">featured engineering</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                    featured software projects
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    a comprehensive portfolio of production platforms, open-source systems, and developer tools built with react, typescript, and modern web frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project, index) => {
              const displaySkills = (project.skills || []).slice(0, 4);

              return (
                <article
                  key={project.id}
                  className="reveal-up hover:scale-[1.01] group rounded-2xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 overflow-hidden flex flex-col justify-between shadow-2xs transition-all duration-200"
                >
                  <div>
                    <div className="aspect-video relative overflow-hidden bg-muted/30">
                      <Image
                        src={project.image}
                        alt={`${project.title} - Software engineering project by Rui Valente`}
                        fill
                        priority={index < 2}
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          <Link href={`/projects/${project.id}`} className="focus:outline-none focus-visible:underline">
                            {project.title}
                          </Link>
                        </h2>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {displaySkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {displaySkills.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono bg-muted/50 text-foreground/90 border border-border/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-border/40 mt-auto">
                    <div className="flex items-center gap-2 pt-4">
                      {project.demo && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8 px-2.5 text-xs font-medium rounded-lg border-border/70 active:scale-[0.96]"
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5"
                          >
                            <Globe className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                            <span>demo</span>
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8 px-2.5 text-xs font-medium rounded-lg border-border/70 active:scale-[0.96] lowercase"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5"
                          >
                            <Github className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                            <span>source</span>
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground active:scale-[0.96] lowercase"
                      >
                        <Link href={`/projects/${project.id}`} className="flex items-center gap-1">
                          <span>details</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            <div className="h-5 w-36 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-1/2 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-border/70 bg-card/60 overflow-hidden space-y-4">
              <Skeleton className="aspect-video" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2 pt-4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}