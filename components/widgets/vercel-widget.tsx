"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle2, Globe, Zap, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function VercelWidget() {
  const { theme } = useTheme();
  const isDarkSide = theme === "dark-side";

  const deployments = [
    {
      name: "ruivalente.com",
      env: "production",
      runtime: "edge",
      latency: "12ms",
      status: "operational",
    },
    {
      name: "cv.ruivalente.com",
      env: "production",
      runtime: "node",
      latency: "24ms",
      status: "operational",
    },
  ];

  return (
    <Card
      className="h-full p-4 flex flex-col justify-between overflow-hidden"
      role="region"
      aria-labelledby="vercel-widget-heading"
    >
      <header className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-foreground/80" aria-hidden="true" />
          <h2 id="vercel-widget-heading" className="text-xs font-semibold lowercase tracking-wider text-muted-foreground">
            vercel deployments
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>99.98% uptime</span>
        </div>
      </header>

      {/* Production Deployments Status */}
      <div className="space-y-2 my-auto">
        {deployments.map((dep) => (
          <div
            key={dep.name}
            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30 border border-border/40 text-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold font-mono text-foreground">{dep.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {dep.env} · {dep.runtime}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-foreground/80 border border-border/50">
              {dep.latency}
            </span>
          </div>
        ))}
      </div>

      {/* Core Web Vitals / Speed Score Footer */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-500" aria-hidden="true" />
          <span className="text-foreground/90 font-medium">cwv 100/100</span>
        </div>
        <span className="text-[10px] text-muted-foreground">global edge delivery</span>
      </div>
    </Card>
  );
}
