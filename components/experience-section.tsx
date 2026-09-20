"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  companyUrl: string;
  achievements: string[];
}

export function ExperienceSection() {
  const router = useRouter();
  const { t } = useI18n();
  const { data: experiences, isLoading } = useData<Experience[]>('/api/experience');

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (!experiences) return null;

  return (
    <Card className="h-full p-4 flex flex-col justify-between" role="region" aria-labelledby="experience-heading">
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-foreground/80" aria-hidden="true" />
          <h2 id="experience-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t.bento.experience.title}
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/experience')}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96]"
          aria-label={t.bento.experience.viewAll}
        >
          {t.bento.experience.viewAll} <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>
      <div className="space-y-2.5 my-auto">
        {experiences.slice(0, 2).map((exp) => (
          <div
            key={exp.id}
            className="p-3 rounded-xl bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 active:scale-[0.98] group shadow-2xs relative"
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-semibold tracking-tight text-foreground">
                <Link href={`/experience/${exp.id}`} className="focus:outline-none focus-visible:underline">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {exp.role}
                </Link>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/70 text-foreground/85 border border-border/40 shrink-0 ml-2 relative z-10">
                {exp.year}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors">
                {exp.company}
              </p>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground p-0.5 relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label={`Visit ${exp.company} website (opens in new tab)`}
              >
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ExperienceSkeleton() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-3">
        {[1, 2].map((i) => (
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