"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { getSocialIcon } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCommitGraph } from "./github-commit-graph";
import Image from "next/image";

interface Profile {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  year: string;
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <Skeleton className="w-24 h-24 rounded-full shrink-0" />
      <div className="flex-1 text-center md:text-left">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex gap-2 justify-center md:justify-start">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-9 w-9" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection() {
  const { theme } = useTheme();
  const isDarkSide = theme === 'dark-side';
  
  // Use different API endpoints based on theme
  const profileEndpoint = isDarkSide ? '/api/dark-side/profile' : '/api/profile';
  const experienceEndpoint = isDarkSide ? '/api/dark-side/experience' : '/api/experience';
  const socialEndpoint = isDarkSide ? '/api/dark-side/social' : '/api/social';

  const { data: profile, isLoading: profileLoading } = useData<Profile>(profileEndpoint);
  const { data: experiences, isLoading: experienceLoading } = useData<Experience[]>(experienceEndpoint);
  const { data: socialLinks, isLoading: socialLoading } = useData<Array<{ icon: string; url: string }>>(socialEndpoint);

  if (profileLoading || socialLoading || experienceLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile || !socialLinks || !experiences) return null;

  // Get the most recent experience (first in the array)
  const currentRole = experiences[0];

  const handleResumeDownload = () => {
    const resumeUrl = 'https://github.com/ruivalente99/resume/raw/main/resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <section className="relative" aria-label="Profile Information">
      {/* GitHub commit graph background */}
      <GitHubCommitGraph username="ruivalente99" className="z-0" opacity={0.28} />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-6">
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className={`shrink-0 relative ${isDarkSide ? 'force-glow' : ''}`}
        >
          <div className="relative p-1 rounded-full ring-1 ring-border/80 bg-background/80 shadow-xs">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <Image
                src={profile.avatar}
                alt={`${profile.name} - Profile Picture`}
                width={96}
                height={96}
                className="object-cover rounded-full"
                priority
              />
            </Avatar>
            {/* Live status badge indicator */}
            <span 
              className="absolute bottom-1 right-1 flex h-3.5 w-3.5" 
              title="Active & Available"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 m-[1px] bg-emerald-500 ring-2 ring-background" />
            </span>
          </div>
        </motion.div>
        
        <div className="flex-1 text-center md:text-left space-y-2.5 md:space-y-3">
          <header className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkSide ? 'force-glow' : ''}`}>
              {profile.name}
            </h1>
            <div className="inline-flex items-center justify-center md:justify-start gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/60 border border-border/60 text-muted-foreground self-center md:self-auto">
              <span>{profile.role}</span>
              <span className="opacity-50">@</span>
              <a
                href={currentRole.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-semibold flex items-center gap-0.5"
                aria-label={`Current company: ${currentRole.company}`}
              >
                {currentRole.company}
              </a>
            </div>
          </header>

          <p className="text-sm text-muted-foreground font-mono">{profile.bio}</p>

          <nav aria-label="Social media and contact links">
            <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center md:justify-start items-center pt-1">
              {socialLinks.map((link, index) => {
                const Icon = getSocialIcon(link.icon);
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-8 w-8 rounded-lg flex items-center justify-center bg-muted/30 hover:bg-muted/70 border border-border/50 text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-[0.96] shadow-2xs ${isDarkSide ? 'force-glow' : ''}`}
                    aria-label={`Visit ${link.icon} profile`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="sr-only">{link.icon}</span>
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                className={`h-8 w-8 rounded-lg flex items-center justify-center bg-muted/30 hover:bg-muted/70 border border-border/50 text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-[0.96] shadow-2xs ${isDarkSide ? 'force-glow' : ''}`}
                aria-label={`Send email to ${profile.email}`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="sr-only">Email</span>
              </a>
              <button
                type="button"
                onClick={handleResumeDownload}
                className={`h-8 px-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 border border-border/60 text-xs font-medium flex items-center gap-1.5 text-foreground transition-all duration-150 active:scale-[0.96] shadow-2xs cursor-pointer hover:border-foreground/20 ${isDarkSide ? 'force-glow' : ''}`}
                aria-label="Download resume as PDF"
              >
                <FileText className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline">download boring resume</span>
                <span className="sm:hidden">resume</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}