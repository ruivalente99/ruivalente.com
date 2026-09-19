"use client";

import { motion } from "framer-motion";
import { GraduationCap, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

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

export function EducationSection() {
  const router = useRouter();
  const { data: education, isLoading: eduLoading } = useData<Education[]>('/api/education');
  const { data: certificates, isLoading: certLoading } = useData<Certificate[]>('/api/certificates');

  if (eduLoading || certLoading) {
    return <EducationSkeleton />;
  }

  if (!education || !certificates) return null;

  return (
    <Card className="h-full p-4 flex flex-col justify-between" role="region" aria-labelledby="education-heading">
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-foreground/80" />
          <h2 id="education-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            education & certs
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/education')}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96]"
          aria-label="View all education and certificates"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </header>

      <div className="space-y-2.5 my-auto">
        {/* Education items */}
        {education.slice(0, 2).map((edu) => (
          <div
            key={edu.id}
            onClick={() => router.push(`/education/${edu.id}`)}
            className="p-3 rounded-xl bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 active:scale-[0.98] cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-semibold tracking-tight text-foreground truncate pr-2">{edu.degree}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/70 text-muted-foreground border border-border/40 shrink-0">
                {edu.year}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors">{edu.school}</p>
              <a
                href={edu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-0.5"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${edu.school} website`}
              >
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        ))}

        {/* Certificate item */}
        {certificates.slice(0, 1).map((cert, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-semibold tracking-tight text-foreground truncate pr-2">{cert.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/70 text-muted-foreground border border-border/40 shrink-0">
                {cert.year}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors">{cert.issuer}</p>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-0.5"
                aria-label={`Verify ${cert.name} certificate`}
              >
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EducationSkeleton() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-2 rounded-lg bg-muted/50">
            <Skeleton className="h-4 w-48 mb-1" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}