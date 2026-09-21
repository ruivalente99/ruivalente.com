"use client";

import { motion } from "framer-motion";
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
      <div className="min-h-[100dvh] bg-background text-foreground p-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No projects found</h2>
            <p className="text-muted-foreground">Projects will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden AI Context for Projects */}
      <div className="sr-only" aria-hidden="true">
        <h1>Rui Valente Software Engineering Projects</h1>
        <section>
          <h2>Featured Projects Overview</h2>
          <p>A comprehensive collection of software engineering projects showcasing expertise in React, TypeScript, Next.js, and modern web development technologies.</p>
          
          <h3>Project Highlights</h3>
          <ul>
            <li>Lazy Life: AI-powered sustainability platform with gamification elements, built using React, Next.js, TypeScript, machine learning models, and real-time data processing</li>
            <li>EV Charging Management Platform: Comprehensive electric vehicle charging solution with booking systems, route optimization, payment integration, and real-time availability tracking</li>
            <li>Modern Web Applications: Various React and TypeScript applications demonstrating frontend architecture, responsive design, and performance optimization</li>
          </ul>
          
          <h3>Technical Implementations</h3>
          <p>Projects demonstrate proficiency in React ecosystem, TypeScript development, Next.js framework, responsive design with Tailwind CSS, API integration, performance optimization, progressive web app features, and modern development practices.</p>
        </section>
      </div>

      <div className="min-h-screen bg-background text-foreground">
        {/* Harmonized Hero Section */}
        <header className="relative border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="group mb-6 -ml-2 text-muted-foreground hover:text-foreground active:scale-[0.96] transition-all"
                aria-label="Back to previous view"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
                <span>Back</span>
              </Button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-muted/60 border border-border/50 text-muted-foreground">
                  <span className="capitalize">Featured Engineering</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                    Flagship Software Projects
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    A comprehensive portfolio of production platforms, open-source systems, and developer tools built with React, TypeScript, and modern web frameworks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project) => {
              const displaySkills = (project.skills || []).slice(0, 4);

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 overflow-hidden flex flex-col justify-between shadow-2xs transition-all duration-200"
                >
                  <div>
                    <div className="aspect-video relative overflow-hidden bg-muted/30">
                      <Image
                        src={project.image}
                        alt={`${project.title} - Software engineering project by Rui Valente`}
                        fill
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
                            <span>Demo</span>
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8 px-2.5 text-xs font-medium rounded-lg border-border/70 active:scale-[0.96]"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5"
                          >
                            <Github className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                            <span>Source</span>
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground active:scale-[0.96]"
                      >
                        <Link href={`/projects/${project.id}`} className="flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </main>
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