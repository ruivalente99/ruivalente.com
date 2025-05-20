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
    <div className="flex flex-col md:flex-row items-center gap-6">
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className={`shrink-0 ${isDarkSide ? 'force-glow' : ''}`}
      >
        <Avatar className="w-24 h-24">
          <img
            src={profile.avatar}
            alt="Profile"
            className="object-cover"
          />
        </Avatar>
      </motion.div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className={`text-2xl font-bold mb-1 ${isDarkSide ? 'force-glow' : ''}`}>
          {profile.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm mb-4">
          <span className="text-muted-foreground">{profile.role}</span>
          <span className="text-muted-foreground">@</span>
          <a
            href={currentRole.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {currentRole.company}
          </a>
        </div>
        <p className="text-muted-foreground mb-4">{profile.bio}</p>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
          <div className="flex gap-2 flex-wrap items-center">
            {socialLinks.map((link, index) => {
              const Icon = getSocialIcon(link.icon);
              return (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.1 }}
                  className={isDarkSide ? 'force-glow' : ''}
                >
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      <Icon className="w-4 h-4" />
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
                size="icon"
                asChild
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-primary"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeDownload}
                className={`gap-2 ${isDarkSide ? 'force-glow' : ''}`}
              >
                <FileText className="w-4 h-4" />
                download boring resume
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}