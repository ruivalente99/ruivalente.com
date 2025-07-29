"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Award, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export default function CertificatesPage() {
  const router = useRouter();
  const { data: certificates, isLoading } = useData<Certificate[]>('/api/certificates');

  if (isLoading) {
    return <CertificatesSkeleton />;
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-background text-foreground p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No certificates found</h2>
            <p className="text-muted-foreground">Certificates will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden AI Context for Certificates */}
      <div className="sr-only" aria-hidden="true">
        <h1>Rui Valente Professional Certificates and Certifications</h1>
        <section>
          <h2>Professional Development</h2>
          <p>Continuous learning and professional development through industry-recognized certifications and courses, demonstrating commitment to staying current with modern web development technologies and best practices.</p>
          
          <h3>Technical Certifications</h3>
          <ul>
            <li>Frontend Masters certifications in React and TypeScript development</li>
            <li>Advanced JavaScript programming certificates</li>
            <li>Project management and leadership training</li>
            <li>Secure coding and application security certifications</li>
            <li>Modern web development best practices</li>
          </ul>
          
          <h3>Learning Focus Areas</h3>
          <p>Specialized training in React ecosystem, TypeScript development, secure coding practices, project management methodologies, and full-stack web development techniques.</p>
        </section>
      </div>

      <div className="min-h-[100dvh] bg-background text-foreground p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">Certificates & Certifications</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Professional development and continuous learning through industry-recognized certifications
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={`${certificate.name}-${certificate.year}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {certificate.year}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{certificate.name}</h3>
                      <p className="text-muted-foreground mb-3">
                        Issued by <span className="font-medium text-foreground">{certificate.issuer}</span>
                      </p>
                    </div>
                    
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={certificate.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Certificate
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CertificatesSkeleton() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-20 mb-4" />
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        
        <div className="grid gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-8 w-32" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
