"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileText,
  Github,
  Sun,
  Search,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit,
  Award,
  Home,
  Copy,
  Mail,
  Check,
  Terminal,
  Sparkles,
  Wand2,
  ExternalLink,
  LucideIcon,
  Languages,
  Blocks,
} from "lucide-react";
import { Kbd } from "@ruivalente99/bibliotheca/ui";
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
import { getIcon } from "@/lib/hooks/useIconMap";
import { useI18n } from "@/lib/i18n/context";
import { useAnimation } from "@/lib/animation/context";

interface SearchableData {
  projects?: Array<{ id: string; title: string; description: string; skills?: string[] }>;
  experiences?: Array<{ id: string; role: string; company: string; skills?: string[] }>;
  education?: Array<{ id: string; degree: string; school: string }>;
  certificates?: Array<{ name: string; issuer: string; year: string; url: string }>;
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
  const { locale, toggleLocale, t } = useI18n();
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const { toast } = useToast();
  const { data: searchData, isLoading: searchLoading } = useData<SearchableData>("/api/search");
  const { data: themesData, isLoading: themesLoading } = useData<{ themes: Theme[] }>("/api/themes");

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

  const navigateTo = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.origin : "https://ruivalente.com";
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Portfolio URL copied to clipboard.",
        duration: 3000,
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
        duration: 3000,
      });
    }
    setOpen(false);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    if (value === "terminal") {
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
    if (value === "dark-side") {
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
    const resumeUrl = "https://github.com/ruivalente99/resume/raw/main/resume.pdf";
    window.open(resumeUrl, "_blank");
    setOpen(false);
  };

  const handleSpecialEffect = (effect: string) => {
    switch (effect) {
      case "matrix":
        document.documentElement.classList.toggle("matrix-effect");
        break;
      case "flip":
        document.body.style.transform = document.body.style.transform ? "" : "rotate(180deg)";
        break;
      case "glitch":
        document.documentElement.classList.toggle("glitch-effect");
        break;
      case "crt":
        document.documentElement.classList.toggle("crt-effect");
        break;
      case "pixel":
        document.documentElement.classList.toggle("pixel-effect");
        break;
      case "reset":
        document.documentElement.classList.remove("matrix-effect", "glitch-effect", "crt-effect", "pixel-effect");
        document.body.style.transform = "";
        break;
    }
    setOpen(false);
  };

  const renderThemeIcon = (iconName: string) => {
    const Icon = getIcon(iconName) as React.ComponentType<{ className?: string; role?: string; 'aria-hidden'?: string | boolean }>;
    return (
      <span aria-hidden="true" className="mr-2 h-4 w-4 shrink-0 flex items-center justify-center">
        <Icon role="presentation" aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
      </span>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative h-8 w-full justify-start text-xs text-muted-foreground sm:pr-12 md:w-44 lg:w-60 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80 transition-all duration-150 flex items-center px-2.5 gap-2 cursor-pointer active:scale-[0.98] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={t.header.search}
      >
        <Search className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden="true" />
        <span className="font-normal truncate">
          {locale === "pt" ? "Pesquisar portfólio..." : "Search portfolio..."}
        </span>
        <div className="pointer-events-none absolute right-1.5 top-1.5 hidden sm:flex items-center" aria-hidden="true">
          <Kbd keys={["mod", "k"]} size="xs" variant="default" />
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">{t.command.searchPlaceholder}</DialogTitle>
        <CommandInput placeholder={t.command.searchPlaceholder} />
        <CommandList className="max-h-[380px] p-1.5 custom-scroll">
          <CommandEmpty>{t.command.noResults}</CommandEmpty>

          {/* Navigation Links */}
          <CommandGroup heading={t.command.navigation}>
            <CommandItem value="Home portfolio overview bio start" onSelect={() => navigateTo("/")}>
              <Home className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Home</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Portfolio overview and profile</p>
              </div>
            </CommandItem>
            <CommandItem value="Projects portfolio showcase apps work applications open source" onSelect={() => navigateTo("/projects")}>
              <FolderGit className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Projects</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Featured applications and open source work</p>
              </div>
            </CommandItem>
            <CommandItem value="Experience work history career jobs Xelerate Techem Openvia Neoception" onSelect={() => navigateTo("/experience")}>
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Experience</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Work history at Xelerate | Techem, Openvia, and Neoception</p>
              </div>
            </CommandItem>
            <CommandItem value="Education university degrees academic UTAD informatics" onSelect={() => navigateTo("/education")}>
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Education</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Degrees and academic qualifications</p>
              </div>
            </CommandItem>
            <CommandItem value="Certificates courses certifications Frontend Masters Udemy HackerRank" onSelect={() => navigateTo("/certificates")}>
              <Award className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Certificates</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Professional certifications and courses</p>
              </div>
            </CommandItem>
            <CommandItem value="Tech & AI Stack technologies languages frontend backend tools artificial intelligence" onSelect={() => navigateTo("/stack")}>
              <Code className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Tech & AI Stack</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Frameworks, languages, tools, and AI workflows</p>
              </div>
            </CommandItem>
            <CommandItem value="Easter Eggs secrets interactive matrix dark side terminal" onSelect={() => navigateTo("/easter-eggs")}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <span>Easter Eggs</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Discover hidden interactive secrets</p>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Quick Actions */}
          <CommandGroup heading={t.command.actions}>
            <CommandItem
              value="Toggle switch language english portuguese idioma mudar"
              onSelect={() => {
                toggleLocale();
                setOpen(false);
              }}
            >
              <Languages className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <span>{locale === "en" ? "Mudar Idioma para Português" : "Switch Language to English"}</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                  {locale === "en" ? "Ativar tradução em Português" : "Set language to English"}
                </p>
              </div>
            </CommandItem>
            <CommandItem
              value="Toggle block assembly entrance animations motion desativar animacoes"
              onSelect={() => {
                toggleAnimations();
                setOpen(false);
              }}
            >
              <Blocks className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <span>
                  {animationsEnabled
                    ? (locale === "pt" ? "Desativar Animações de Blocos" : "Disable Block Animations")
                    : (locale === "pt" ? "Ativar Animações de Blocos" : "Enable Block Animations")}
                </span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                  {animationsEnabled
                    ? (locale === "pt" ? "Renderização imediata sem movimento" : "Instant rendering without motion")
                    : (locale === "pt" ? "Montagem 3D dos blocos no ecrã" : "3D block assembly on screen")}
                </p>
              </div>
            </CommandItem>
            <CommandItem value="Copy portfolio link share URL clipboard" onSelect={handleCopyLink}>
              <Copy className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Copy Portfolio Link</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Copy URL to share with others</p>
              </div>
            </CommandItem>
            <CommandItem value="Download resume CV PDF document curriculum vitae" onSelect={handleResumeDownload}>
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Download Resume</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">Get a PDF copy of my resume</p>
              </div>
            </CommandItem>
            <CommandItem
              value="View GitHub profile github.com/ruivalente99 open source code"
              onSelect={() => {
                window.open("https://github.com/ruivalente99", "_blank");
                setOpen(false);
              }}
            >
              <Github className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>View GitHub Profile</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">github.com/ruivalente99</p>
              </div>
            </CommandItem>
            <CommandItem
              value="Send email contact mailto email@ruivalente.com message"
              onSelect={() => {
                window.location.href = "mailto:email@ruivalente.com";
                setOpen(false);
              }}
            >
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <span>Send Email</span>
                <p className="text-xs text-foreground/75 dark:text-muted-foreground">email@ruivalente.com</p>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Dynamic Search: Projects */}
          {searchData?.projects && searchData.projects.length > 0 && (
            <CommandGroup heading={t.command.projects}>
              {searchData.projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.title} ${project.description} ${(project.skills || []).join(" ")}`}
                  onSelect={() => navigateTo(`/projects/${project.id}`)}
                >
                  <FolderGit className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{project.title}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Experience */}
          {searchData?.experiences && searchData.experiences.length > 0 && (
            <CommandGroup heading="Experience">
              {searchData.experiences.map((exp) => (
                <CommandItem
                  key={exp.id}
                  value={`${exp.role} ${exp.company} ${(exp.skills || []).join(" ")}`}
                  onSelect={() => navigateTo(`/experience/${exp.id}`)}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{exp.role}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      at {exp.company}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Education & Certifications */}
          {searchData?.education && searchData.education.length > 0 && (
            <CommandGroup heading="Education">
              {searchData.education.map((edu) => (
                <CommandItem
                  key={edu.id}
                  value={`${edu.degree} ${edu.school}`}
                  onSelect={() => navigateTo(`/education/${edu.id}`)}
                >
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{edu.degree}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      at {edu.school}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Certificates */}
          {searchData?.certificates && searchData.certificates.length > 0 && (
            <CommandGroup heading="Certificates">
              {searchData.certificates.map((cert, index) => (
                <CommandItem
                  key={index}
                  value={`${cert.name} ${cert.issuer} ${cert.year}`}
                  onSelect={() => {
                    if (cert.url) {
                      window.open(cert.url, "_blank");
                    } else {
                      navigateTo("/certificates");
                    }
                    setOpen(false);
                  }}
                >
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{cert.name}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Tech Stack Categories */}
          {searchData?.categories && searchData.categories.length > 0 && (
            <CommandGroup heading="Tech Stack Categories">
              {searchData.categories.map((category) => (
                <CommandItem
                  key={category.name}
                  value={`${category.name} ${category.items.map(i => `${i.name} ${i.description}`).join(" ")}`}
                  onSelect={() => navigateTo("/stack")}
                >
                  <Code className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{category.name}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      {category.items.length} tools and technologies
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          {/* Appearance & Themes */}
          {!themesLoading && themesData?.themes && (
            <CommandGroup heading={t.theme.appearance}>
              {themesData.themes.map(({ name, value, icon, description, hidden }) => {
                if (value === "terminal") {
                  return (
                    <CommandItem
                      key={value}
                      value={`Theme Appearance ${name} ${value}`}
                      onSelect={() => handleThemeChange(value)}
                      className="relative"
                    >
                      <Terminal className="mr-2 h-4 w-4 text-green-500" aria-hidden="true" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{name}</span>
                          <Sparkles className="w-3 h-3 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                          Secret retro terminal mode
                        </p>
                      </div>
                      {theme === value && (
                        <Check className="ml-2 h-4 w-4 text-green-500" aria-hidden="true" />
                      )}
                    </CommandItem>
                  );
                }
                if (!hidden) {
                  return (
                    <CommandItem
                      key={value}
                      value={`Theme Appearance ${name} ${value} ${description}`}
                      onSelect={() => handleThemeChange(value)}
                    >
                      {renderThemeIcon(icon)}
                      <div className="flex-1">
                        <span>{name}</span>
                        <p className="text-xs text-foreground/75 dark:text-muted-foreground">{description}</p>
                      </div>
                      {theme === value && (
                        <Check className="ml-2 h-4 w-4 text-primary" aria-hidden="true" />
                      )}
                    </CommandItem>
                  );
                }
                return null;
              })}
            </CommandGroup>
          )}

          {/* Special Effects - When in terminal theme */}
          {theme === "terminal" && (
            <CommandGroup heading="Special Effects">
              <CommandItem onSelect={() => handleSpecialEffect("matrix")}>
                <Wand2 className="mr-2 h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <span>Toggle Matrix Effect</span>
                  <p className="text-xs text-muted-foreground">Enter the digital rain</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("glitch")}>
                <Wand2 className="mr-2 h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <span>Toggle Glitch Effect</span>
                  <p className="text-xs text-muted-foreground">Add digital distortion</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("crt")}>
                <Wand2 className="mr-2 h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <span>Toggle CRT Effect</span>
                  <p className="text-xs text-muted-foreground">Old school monitor scanlines</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("pixel")}>
                <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                <div className="flex-1">
                  <span>Toggle Pixel Effect</span>
                  <p className="text-xs text-muted-foreground">8-bit pixelation filter</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("flip")}>
                <Wand2 className="mr-2 h-4 w-4 text-pink-500" />
                <div className="flex-1">
                  <span>Flip UI</span>
                  <p className="text-xs text-muted-foreground">Turn viewport upside down</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("reset")}>
                <Wand2 className="mr-2 h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <span>Reset Effects</span>
                  <p className="text-xs text-muted-foreground">Clear all special effects</p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>

        {/* Command Palette Shortcuts Footer */}
        <div className="border-t border-border/60 px-3.5 py-2.5 text-[11px] text-muted-foreground flex items-center justify-between bg-popover relative z-10 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Kbd keys={["up"]} size="xs" variant="default" />
              <Kbd keys={["down"]} size="xs" variant="default" />
              <span className="ml-0.5">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <Kbd keys={["enter"]} size="xs" variant="default" />
              <span className="ml-0.5">Select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Kbd keys={["esc"]} size="xs" variant="default" />
            <span className="ml-0.5">Close</span>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}