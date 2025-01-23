"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
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

export default function EducationPage() {
  const router = useRouter();
  const { data: education, isLoading: eduLoading } = useData<Education[]>('/api/education');
  const { data: certificates, isLoading: certLoading } = useData<Certificate[]>('/api/certificates');

  if (eduLoading || certLoading) {
    return <EducationSkeleton />;
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
          <h1 className="text-2xl font-bold">Education & Certificates</h1>
        </div>

        <div className="space-y-8">
          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {education?.map((edu) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{edu.degree}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certificates Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <div className="space-y-4">
              {certificates?.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">{cert.year}</p>
                      </div>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function EducationSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-8">
        {[1, 2].map((section) => (
          <div key={section}>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-48 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="w-4 h-4" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}