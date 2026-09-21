"use client";

import { motion } from "framer-motion";
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
      <div className="min-h-[100dvh] bg-background text-foreground p-4">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No experience data found</h2>
            <p className="text-muted-foreground">Experience information will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden AI Context for Experience */}
      <div className="sr-only" aria-hidden="true">
        <h1>Rui Valente Professional Experience</h1>
        <section>
          <h2>Career Summary</h2>
          <p>Software engineer with progressive experience in frontend development, currently serving as Frontend Engineer at Xelerate | Techem since December 2025, with previous frontend engineering experience at Openvia from 2022 to 2025 and trainee experience at Neoception from 2021-2022.</p>
          
          <h3>Current Role: Frontend Engineer at Xelerate | Techem (Dec 2025 - Present)</h3>
          <ul>
            <li>Architecting and developing modern responsive frontend applications with React and TypeScript</li>
            <li>Engineering high-performance enterprise portals and component design systems</li>
            <li>Collaborating across cross-functional distributed agile teams</li>
            <li>Implementing scalable frontend architectures, state management, and API integrations</li>
          </ul>
          
          <h3>Previous Role: Frontend Engineer at Openvia (2022 - 2025)</h3>
          <ul>
            <li>Building and maintaining modern web applications within a monorepo architecture</li>
            <li>Developing with Next.js and TypeScript for scalable frontend solutions</li>
            <li>Applying Tailwind CSS for consistent and responsive design systems</li>
            <li>Ensuring code reliability through comprehensive testing with Jest</li>
            <li>Leveraging Azure for cloud infrastructure and GitLab for CI/CD pipelines</li>
          </ul>

          <h3>Previous Role: Frontend Engineer at Openvia (2022 - 2025)</h3>
          <ul>
            <li>Led modern web application development with React and TypeScript</li>
            <li>Implemented scalable architecture and optimal user experience</li>
            <li>Worked with cutting-edge technologies: React, TypeScript, Bootstrap, GraphQL, REST APIs</li>
            <li>Achieved significant performance improvements through code optimization</li>
            <li>Maintained comprehensive code coverage with testing practices</li>
            <li>Implemented zero-downtime deployments using advanced CI/CD strategies</li>
            <li>Mentored junior developers and established code review standards</li>
            <li>Contributed to agile process improvements increasing team velocity</li>
          </ul>
          
          <h3>Previous Role: Software Engineer Trainee at Neoception (2021 - 2022)</h3>
          <ul>
            <li>Completed comprehensive program combining hands-on development with professional skills training</li>
            <li>Built strong foundation in software engineering and workplace competencies</li>
            <li>Learned programming fundamentals, object-oriented programming, and design patterns</li>
            <li>Developed web applications with HTML5, CSS3, JavaScript, and React basics</li>
            <li>Gained experience with database concepts, SQL fundamentals, and data modeling</li>
            <li>Mastered version control with Git workflows and collaborative development</li>
            <li>Successfully delivered first production deployment to client</li>
            <li>Maintained excellent project completion rates with tasks completed on schedule</li>
            <li>Achieved business-level English communication proficiency</li>
          </ul>
          
          <h3>Professional Development</h3>
          <p>Transformed from programming novice to confident frontend engineer with both technical skills and professional competencies including time management, goal orientation, adaptability, and effective collaboration in cross-functional environments.</p>
        </section>
      </div>

      <div className="min-h-screen bg-background text-foreground lowercase">
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
            </motion.div>
          </div>
        </header>

        <main className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-5">
            {experiences?.map((exp) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-2xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 p-6 md:p-7 shadow-2xs transition-all duration-200"
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
                      aria-label={`Visit ${exp.company} website (opens in new tab)`}
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
              </motion.article>
            ))}
          </div>
        </main>
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