"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export function CertificatesSection() {
  const { data: certificates, isLoading } = useData<Certificate[]>('/api/certificates');

  if (isLoading) {
    return <CertificatesSkeleton />;
  }

  if (!certificates) return null;

  return (
    <Card className="h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4" />
        <h2 className="text-sm font-bold">certificates</h2>
      </div>
      <div className="space-y-3">
        {certificates.map((cert, index) => (
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
    </Card>
  );
}

function CertificatesSkeleton() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="h-4 w-24" />
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