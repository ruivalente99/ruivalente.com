"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileText,
  Github,
  Sun,
  Moon,
  Laptop,
  Palette,
  Search,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit,
  Boxes,
  Wrench,
  Library,
  Check,
  Terminal,
  Sparkles,
  Wand2,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useData } from "@/lib/hooks/useData";
import { useToast } from "@/components/ui/use-toast";
import { getIcon } from '@/lib/hooks/useIconMap';

interface SearchableData {
  projects?: Array<{ id: string; title: string; description: string }>;
  experiences?: Array<{ id: string; role: string; company: string }>;
  education?: Array<{ id: string; degree: string; school: string }>;
  categories?: Array<{
    name: string;
    items: Array<{ name: string; description: string }>;
  }>;
}

interface Theme {
  name: string;
  value: string;
  icon: string;
  description: string;
  preview?: {
    background: string;
    foreground: string;
    accent: string;
  };
  hidden?: boolean;
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { data: searchData, isLoading: searchLoading } = useData<SearchableData>('/api/search');
  const { data: themesData, isLoading: themesLoading } = useData<{ themes: Theme[] }>('/api/themes');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    console.log(value);
    if (value === 'terminal') {
      toast({
        title: "Easter Egg Found!",
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>Welcome to terminal mode. Type &apos;help&apos; in the command bar for available commands.</span>
          </div>
        ),
        duration: 5000,
      });
    }
    if(value === 'dark-side') {
      toast({
        title: "Easter Egg Found!",
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>Welcome to the dark side. May the force be with you.</span>
          </div>
        ),
        duration: 5000,
      });
    }
    setOpen(false);
  };

  const handleResumeDownload = () => {
    const resumeUrl = '/resume.pdf';
    window.open(resumeUrl, '_blank');
    setOpen(false);
  };

  const handleSpecialEffect = (effect: string) => {
    switch (effect) {
      case 'matrix':
        document.documentElement.classList.toggle('matrix-effect');
        break;
      case 'flip':
        document.body.style.transform = document.body.style.transform ? '' : 'rotate(180deg)';
        break;
      case 'glitch':
        document.documentElement.classList.toggle('glitch-effect');
        break;
      case 'crt':
        document.documentElement.classList.toggle('crt-effect');
        break;
      case 'pixel':
        document.documentElement.classList.toggle('pixel-effect');
        break;
      case 'reset':
        document.documentElement.classList.remove('matrix-effect', 'glitch-effect', 'crt-effect', 'pixel-effect');
        document.body.style.transform = '';
        break;
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search commands and navigation</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={handleResumeDownload}>
              <FileText className="mr-2 h-4 w-4" />
              <div className="flex-1">
                Download Resume
                <p className="text-xs text-muted-foreground">Get a copy of my resume</p>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => {
              window.open('https://github.com/ruivalente99', '_blank');
              setOpen(false);
            }}>
              <Github className="mr-2 h-4 w-4" />
              <div className="flex-1">
                View GitHub Profile
                <p className="text-xs text-muted-foreground">Check out my code</p>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => {
              router.push('/easter-eggs');
              setOpen(false);
            }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <div className="flex-1">
                Easter Eggs
                <p className="text-xs text-muted-foreground">
                  Discover hidden features and secrets
                </p>
              </div>
            </CommandItem>
          </CommandGroup>

          {/* Theme Selection */}
          {!themesLoading && themesData?.themes && (
            <CommandGroup heading="Appearance">
              {themesData.themes.map(({ name, value, icon, description, hidden }) => {
                const Icon = getIcon(icon) as LucideIcon;
                // Special handling for terminal theme
                if (value === 'terminal') {
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => handleThemeChange(value)}
                      className="relative"
                    >
                      <Terminal className="mr-2 h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {name}
                          <Sparkles className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          You found the secret theme! Welcome to the matrix.
                        </p>
                      </div>
                      {theme === value && (
                        <Check className="ml-2 h-4 w-4 text-green-500" />
                      )}
                    </CommandItem>
                  );
                }
                // Regular themes
                if (!hidden) {
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => handleThemeChange(value)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <div className="flex-1">
                        {name}
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      {theme === value && (
                        <Check className="ml-2 h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  );
                }
                return null;
              })}
            </CommandGroup>
          )}

          {/* Special Effects - Only show when in terminal theme */}
          {theme === 'terminal' && (
            <CommandGroup heading="Special Effects">
              <CommandItem onSelect={() => handleSpecialEffect('matrix')}>
                <Wand2 className="mr-2 h-4 w-4 text-green-500" />
                <div className="flex-1">
                  Toggle Matrix Effect
                  <p className="text-xs text-muted-foreground">
                    Enter the digital rain
                  </p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect('glitch')}>
                <Wand2 className="mr-2 h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  Toggle Glitch Effect
                  <p className="text-xs text-muted-foreground">
                    Add some digital distortion
                  </p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect('crt')}>
                <Wand2 className="mr-2 h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  Toggle CRT Effect
                  <p className="text-xs text-muted-foreground">
                    Old school monitor vibes
                  </p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect('pixel')}>
                <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                <div className="flex-1">
                  Toggle Pixel Effect
                  <p className="text-xs text-muted-foreground">
                    8-bit everything
                  </p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect('flip')}>
                <Wand2 className="mr-2 h-4 w-4 text-pink-500" />
                <div className="flex-1">
                  Flip UI
                  <p className="text-xs text-muted-foreground">
                    Turn everything upside down
                  </p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect('reset')}>
                <Wand2 className="mr-2 h-4 w-4 text-red-500" />
                <div className="flex-1">
                  Reset Effects
                  <p className="text-xs text-muted-foreground">
                    Clear all special effects
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandSeparator />

          {/* Navigation Sections */}
          {searchData?.categories && searchData.categories.length > 0 && (
            <CommandGroup heading="Tech Stack">
              {searchData.categories.map((category) => (
                <CommandItem
                  key={category.name}
                  onSelect={() => {
                    router.push('/stack');
                    setOpen(false);
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    {category.name}
                    <p className="text-xs text-muted-foreground">
                      {category.items.length} tools and technologies
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Projects */}
          {searchData?.projects && searchData.projects.length > 0 && (
            <CommandGroup heading="Projects">
              {searchData.projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    router.push(`/projects/${project.id}`);
                    setOpen(false);
                  }}
                >
                  <FolderGit className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    {project.title}
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => {
                  router.push('/projects');
                  setOpen(false);
                }}
              >
                <Code className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  View All Projects
                  <p className="text-xs text-muted-foreground">
                    Browse all projects
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          {/* Experience */}
          {searchData?.experiences && searchData.experiences.length > 0 && (
            <CommandGroup heading="Experience">
              {searchData.experiences.map((exp) => (
                <CommandItem
                  key={exp.id}
                  onSelect={() => {
                    router.push(`/experience/${exp.id}`);
                    setOpen(false);
                  }}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    {exp.role}
                    <p className="text-xs text-muted-foreground">
                      at {exp.company}
                    </p>
                  </div>
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => {
                  router.push('/experience');
                  setOpen(false);
                }}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  View All Experience
                  <p className="text-xs text-muted-foreground">
                    See full work history
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          {/* Education */}
          {searchData?.education && searchData.education.length > 0 && (
            <CommandGroup heading="Education">
              {searchData.education.map((edu) => (
                <CommandItem
                  key={edu.id}
                  onSelect={() => {
                    router.push(`/education/${edu.id}`);
                    setOpen(false);
                  }}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    {edu.degree}
                    <p className="text-xs text-muted-foreground">
                      at {edu.school}
                    </p>
                  </div>
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => {
                  router.push('/education');
                  setOpen(false);
                }}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  View All Education
                  <p className="text-xs text-muted-foreground">
                    See academic background
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}