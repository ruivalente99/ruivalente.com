"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, GraduationCap, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  url: string;
}

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export default function EducationPage() {
  const router = useRouter();
  const { data: education, isLoading: eduLoading } = useData<Education[]>("/api/education");
  const { data: certificates, isLoading: certLoading } = useData<Certificate[]>("/api/certificates");

  if (eduLoading || certLoading) {
    return <EducationSkeleton />;
  }

  return (
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
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Academic Background</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                  Education & Qualifications
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Academic degrees, certifications, and specialized technical qualifications.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="space-y-12">
          {/* Education Section */}
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Academic Degrees</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {education?.length || 0} degrees
              </span>
            </div>

            <div className="space-y-4">
              {education?.map((edu) => (
                <motion.article
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative group rounded-2xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 p-6 md:p-7 shadow-2xs transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/education/${edu.id}`} className="focus:outline-none focus-visible:underline">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {edu.degree}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground pt-1">
                        <span className="font-medium text-foreground/80">{edu.school}</span>
                        <span className="opacity-40" aria-hidden="true">•</span>
                        <span>{edu.year}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10 self-start sm:self-auto">
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Visit ${edu.school} website (opens in new tab)`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <ChevronRight className="w-4 h-4 text-muted-foreground pointer-events-none group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Certificates Section */}
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Certifications</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {certificates?.length || 0} certified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates?.map((cert, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 p-5 shadow-2xs transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-4">
                    <span className="text-xs font-mono text-muted-foreground">{cert.year}</span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                      aria-label={`View ${cert.name} certificate credential (opens in new tab)`}
                    >
                      <span>Credential</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function EducationSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            <div className="h-5 w-32 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-1/2 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="space-y-10">
          {[1, 2].map((section) => (
            <div key={section} className="space-y-4">
              <div className="h-6 w-36 bg-muted rounded animate-pulse" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-3">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}