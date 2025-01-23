"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
  content: string;
}

export default function ExperiencePage() {
  const router = useRouter();
  const { data: experiences, isLoading } = useData<Experience[]>('/api/experience');

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Experience</h1>
        </div>

        <div className="space-y-6">
          {experiences?.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-2">{exp.role}</h2>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.year}</p>
                  </div>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Achievements:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ExperienceSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <Skeleton className="h-4 w-48 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="space-y-1">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}