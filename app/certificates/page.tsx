"use client";

import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
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
      <div className="min-h-[100dvh] bg-background text-foreground p-4 lowercase">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 lowercase"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            back
          </Button>
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">no certificates found</h2>
            <p className="text-muted-foreground">certificates will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[100dvh] bg-background text-foreground p-4 lowercase">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <PageBreadcrumbs
              className="mb-4"
              crumbs={[
                { name: "Home", path: "/" },
                { name: "Certificates", path: "/certificates" },
              ]}
            />
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 lowercase"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              back
            </Button>
            
            <div className="reveal-up">
              <h1 className="text-4xl font-bold mb-4">certificates &amp; certifications</h1>
              <p className="text-muted-foreground text-lg mb-8">
                professional development and continuous learning through industry-recognized certifications
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {certificates.map((certificate, index) => (
              <div
                key={`${certificate.name}-${certificate.year}`}
                className="reveal-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-xs lowercase">
                          <Calendar className="h-3 w-3 mr-1" />
                          {certificate.year}
                        </Badge>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-2 lowercase">{certificate.name.toLowerCase()}</h2>
                      <p className="text-muted-foreground mb-3">
                        issued by <span className="font-medium text-foreground lowercase">{certificate.issuer.toLowerCase()}</span>
                      </p>
                    </div>
                    
                    <Button asChild variant="outline" size="sm" className="lowercase">
                      <a 
                        href={certificate.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        view certificate
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
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
