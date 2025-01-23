"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

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
  const { data: experiences, isLoading } = useData<Experience[]>('/api/experience');

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (!experiences) return null;

  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <h2 className="text-sm font-bold">experience</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/experience')}
          className="text-xs"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
      <div className="space-y-3">
        {experiences.slice(0, 2).map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push(`/experience/${exp.id}`)}
            className="p-2 rounded-lg bg-muted/50 cursor-pointer group relative"
          >
            <h3 className="text-sm font-semibold mb-1">{exp.role}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{exp.company}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{exp.year}</span>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
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