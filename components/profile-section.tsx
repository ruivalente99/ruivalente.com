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
      <GitHubCommitGraph username="ruivalente99" className="z-0" opacity={0.35} />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className={`shrink-0 ${isDarkSide ? 'force-glow' : ''}`}
        >
          <Avatar className="w-20 h-20 md:w-24 md:h-24">
            <Image
              src={profile.avatar}
              alt={`${profile.name} - Profile Picture`}
              width={96}
              height={96}
              className="object-cover rounded-full"
            />
          </Avatar>
        </motion.div>
        
        <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
          <header>
            <h1 className={`text-xl md:text-2xl font-bold ${isDarkSide ? 'force-glow' : ''}`}>
              {profile.name}
            </h1>
          </header>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm">
            <p className="text-muted-foreground">
              <span className="sr-only">Current role: </span>
              {profile.role}
            </p>
            <span className="text-muted-foreground" aria-hidden="true">@</span>
            <a
              href={currentRole.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              aria-label={`Current company: ${currentRole.company}`}
            >
              {currentRole.company}
            </a>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">{profile.bio}</p>
          <nav aria-label="Social media and contact links">
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center md:justify-start items-center">
              <div className="flex gap-1 md:gap-2 flex-wrap items-center justify-center md:justify-start">
                {socialLinks.map((link, index) => {
                  const Icon = getSocialIcon(link.icon);
                  return (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.1 }}
                      className={isDarkSide ? 'force-glow' : ''}
                    >
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                          aria-label={`Visit ${link.icon} profile`}
                        >
                          <Icon className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="sr-only">{link.icon}</span>
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={isDarkSide ? 'force-glow' : ''}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:text-primary"
                      aria-label={`Send email to ${profile.email}`}
                    >
                      <Mail className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="sr-only">Email</span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResumeDownload}
                    className={`gap-1 md:gap-2 text-xs md:text-sm h-8 ${isDarkSide ? 'force-glow' : ''}`}
                    aria-label="Download resume as PDF"
                  >
                    <FileText className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">download boring resume</span>
                    <span className="sm:hidden">resume</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}