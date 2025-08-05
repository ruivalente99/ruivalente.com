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
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <h2 className="text-sm font-bold">education & certificates</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/education')}
          className="text-xs"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Education */}
        <div className="space-y-3">
          {education.slice(0, 2).map((edu) => (
            <motion.div
              key={edu.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/education/${edu.id}`)}
              className="p-2 rounded-lg bg-muted/50 cursor-pointer group relative"
            >
              <h3 className="text-sm font-semibold mb-1">{edu.degree}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{edu.school}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{edu.year}</span>
                  <a
                    href={edu.url}
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

        {/* Certificates */}
        <div className="space-y-3">
          {certificates.slice(0, 1).map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-2 rounded-lg bg-muted/50"
            >
              <h3 className="text-sm font-semibold mb-1">{cert.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{cert.year}</span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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