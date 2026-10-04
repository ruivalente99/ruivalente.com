"use client";

import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  companyUrl: string;
  skills: string[];
  contentPath: string;
}

export default function ExperiencePage() {
  const router = useRouter();
  const { data: experiences, isLoading } = useData<Experience[]>('/api/experience');

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-background text-foreground p-4 lowercase">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 lowercase"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> back
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">no experience data found</h2>
            <p className="text-muted-foreground">experience information will appear here when available.</p>
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
                  { name: "Experience", path: "/experience" },
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
                  <span className="lowercase">career path</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                    professional experience
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    progressive software engineering career with expertise in react, typescript, and modern component systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-5">
            {experiences?.map((exp) => (
              <article
                key={exp.id}
                className="reveal-up hover:scale-[1.01] relative group rounded-2xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 p-6 md:p-7 shadow-2xs transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/experience/${exp.id}`} className="focus:outline-none focus-visible:underline">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {exp.role}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground pt-0.5">
                      <span className="font-medium text-foreground/80">{exp.company}</span>
                      <span className="opacity-40" aria-hidden="true">•</span>
                      <span>{exp.year}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative z-10 self-start sm:self-auto">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`visit ${exp.company.toLowerCase()} website (opens in new tab)`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <ChevronRight className="w-4 h-4 text-muted-foreground pointer-events-none group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono bg-muted/50 text-foreground/90 border border-border/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ExperienceSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            <div className="h-5 w-28 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-1/2 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}