"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileText,
  Github,
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
  Languages,
  Blocks,
  Palette,
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
import { cn } from "@/lib/utils";

interface SearchableData {
  projects?: Array<{ id: string; title: string; description: string; skills?: string[] }>;
  experiences?: Array<{ id: string; role: string; company: string; skills?: string[] }>;
  education?: Array<{ id: string; degree: string; school: string; year?: string }>;
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

type SearchCategory = "all" | "projects" | "experience" | "stack" | "actions" | "themes";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { locale, toggleLocale, t } = useI18n();
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const { toast } = useToast();
  const { data: searchData } = useData<SearchableData>("/api/search");
  const { data: themesData, isLoading: themesLoading } = useData<{ themes: Theme[] }>("/api/themes");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
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
        title: "link copied",
        description: "portfolio url copied to clipboard.",
        duration: 3000,
      });
    } catch {
      toast({
        title: "copy failed",
        description: "could not copy link to clipboard.",
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
        title: "easter egg found",
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>welcome to terminal mode. type &apos;help&apos; in the command bar for available commands.</span>
          </div>
        ),
        duration: 5000,
      });
    }
    if (value === "dark-side") {
      toast({
        title: "easter egg found",
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>welcome to the dark side. may the force be with you.</span>
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
    const Icon = getIcon(iconName) as React.ComponentType<{ className?: string; role?: string; "aria-hidden"?: string | boolean }>;
    return (
      <span aria-hidden="true" className="mr-2 h-4 w-4 shrink-0 flex items-center justify-center">
        <Icon role="presentation" aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
      </span>
    );
  };

  const categoryChips: Array<{ id: SearchCategory; label: string }> = [
    { id: "all", label: "all" },
    { id: "projects", label: "projects" },
    { id: "experience", label: "experience" },
    { id: "stack", label: "tech stack" },
    { id: "actions", label: "actions" },
    { id: "themes", label: "themes" },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative h-8 w-full justify-start text-xs text-muted-foreground sm:pr-12 md:w-44 lg:w-60 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80 transition-all duration-150 flex items-center px-2.5 gap-2 cursor-pointer active:scale-[0.98] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lowercase"
        aria-label={t.header.search.toLowerCase()}
      >
        <Search className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden="true" />
        <span className="font-normal truncate">
          {locale === "pt" ? "pesquisar portfólio..." : "search portfolio..."}
        </span>
        <div className="pointer-events-none absolute right-1.5 top-1.5 hidden sm:flex items-center" aria-hidden="true">
          <Kbd keys={["mod", "k"]} size="xs" variant="default" />
        </div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">
          {locale === "pt" ? "pesquisar no portfólio" : "search portfolio command palette"}
        </DialogTitle>
        <CommandInput
          placeholder={locale === "pt" ? "pesquisar no portfólio..." : "search portfolio or type command..."}
          className="lowercase"
        />

        {/* Quick Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40 overflow-x-auto custom-scroll text-xs bg-muted/15 shrink-0">
          {categoryChips.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-150 cursor-pointer shrink-0 border lowercase",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary font-medium shadow-2xs"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <CommandList className="max-h-[380px] p-1.5 custom-scroll lowercase">
          <CommandEmpty className="py-6 text-center text-xs text-muted-foreground lowercase">
            {t.command.noResults.toLowerCase()}
          </CommandEmpty>

          {/* Navigation Links */}
          {(activeCategory === "all" || activeCategory === "actions") && (
            <CommandGroup heading={t.command.navigation.toLowerCase()}>
              <CommandItem value="home portfolio overview bio start" onSelect={() => navigateTo("/")}>
                <Home className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>home</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">portfolio overview and profile</p>
                </div>
              </CommandItem>
              <CommandItem value="projects portfolio showcase apps work applications open source" onSelect={() => navigateTo("/projects")}>
                <FolderGit className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>projects</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">featured applications and open source work</p>
                </div>
              </CommandItem>
              <CommandItem value="experience work history career jobs xelerate techem openvia neoception" onSelect={() => navigateTo("/experience")}>
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>experience</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">work history at xelerate | techem, openvia, and neoception</p>
                </div>
              </CommandItem>
              <CommandItem value="education university degrees academic utad informatics" onSelect={() => navigateTo("/education")}>
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>education</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">degrees and academic qualifications</p>
                </div>
              </CommandItem>
              <CommandItem value="certificates courses certifications frontend masters udemy hackerrank" onSelect={() => navigateTo("/education")}>
                <Award className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>certificates</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">professional certifications and courses</p>
                </div>
              </CommandItem>
              <CommandItem value="tech & ai stack technologies languages frontend backend tools artificial intelligence copilot antigravity claude code" onSelect={() => navigateTo("/stack")}>
                <Code className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>tech &amp; ai stack</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">frameworks, languages, tools, and ai workflows</p>
                </div>
              </CommandItem>
              <CommandItem value="easter eggs secrets interactive matrix dark side terminal" onSelect={() => navigateTo("/easter-eggs")}>
                <Sparkles className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                <div className="flex-1">
                  <span>easter eggs</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">discover hidden interactive secrets</p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandSeparator />

          {/* Quick Actions */}
          {(activeCategory === "all" || activeCategory === "actions") && (
            <CommandGroup heading={t.command.actions.toLowerCase()}>
              <CommandItem
                value="toggle switch language english portuguese idioma mudar traducao"
                onSelect={() => {
                  toggleLocale();
                  setOpen(false);
                }}
              >
                <Languages className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                <div className="flex-1">
                  <span>{locale === "en" ? "mudar idioma para português" : "switch language to english"}</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                    {locale === "en" ? "ativar tradução em português" : "set language to english"}
                  </p>
                </div>
              </CommandItem>
              <CommandItem
                value="toggle block assembly entrance animations motion desativar animacoes"
                onSelect={() => {
                  toggleAnimations();
                  setOpen(false);
                }}
              >
                <Blocks className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                <div className="flex-1">
                  <span>
                    {animationsEnabled
                      ? (locale === "pt" ? "desativar animações de blocos" : "disable block animations")
                      : (locale === "pt" ? "ativar animações de blocos" : "enable block animations")}
                  </span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                    {animationsEnabled
                      ? (locale === "pt" ? "renderização imediata sem movimento" : "instant rendering without motion")
                      : (locale === "pt" ? "montagem 3d dos blocos no ecrã" : "3d block assembly on screen")}
                  </p>
                </div>
              </CommandItem>
              <CommandItem value="copy portfolio link share url clipboard" onSelect={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>copy portfolio link</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">copy url to share with others</p>
                </div>
              </CommandItem>
              <CommandItem value="download resume cv pdf document curriculum vitae" onSelect={handleResumeDownload}>
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>download resume</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">get a pdf copy of my resume</p>
                </div>
              </CommandItem>
              <CommandItem
                value="view github profile github.com/ruivalente99 open source code"
                onSelect={() => {
                  window.open("https://github.com/ruivalente99", "_blank");
                  setOpen(false);
                }}
              >
                <Github className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>view github profile</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">github.com/ruivalente99</p>
                </div>
              </CommandItem>
              <CommandItem
                value="send email contact mailto email@ruivalente.com message"
                onSelect={() => {
                  window.location.href = "mailto:email@ruivalente.com";
                  setOpen(false);
                }}
              >
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <span>send email</span>
                  <p className="text-xs text-foreground/75 dark:text-muted-foreground">email@ruivalente.com</p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandSeparator />

          {/* Dynamic Search: Projects */}
          {(activeCategory === "all" || activeCategory === "projects") && searchData?.projects && searchData.projects.length > 0 && (
            <CommandGroup heading={t.command.projects.toLowerCase()}>
              {searchData.projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.title.toLowerCase()} ${project.description.toLowerCase()} ${(project.skills || []).join(" ").toLowerCase()} tag:project`}
                  onSelect={() => navigateTo(`/projects/${project.id}`)}
                >
                  <FolderGit className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{project.title.toLowerCase()}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground line-clamp-1">
                      {project.description.toLowerCase()}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Experience */}
          {(activeCategory === "all" || activeCategory === "experience") && searchData?.experiences && searchData.experiences.length > 0 && (
            <CommandGroup heading="experience">
              {searchData.experiences.map((exp) => (
                <CommandItem
                  key={exp.id}
                  value={`${exp.role.toLowerCase()} ${exp.company.toLowerCase()} ${(exp.skills || []).join(" ").toLowerCase()} tag:experience`}
                  onSelect={() => navigateTo(`/experience/${exp.id}`)}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{exp.role.toLowerCase()}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      at {exp.company.toLowerCase()}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Education */}
          {(activeCategory === "all" || activeCategory === "experience") && searchData?.education && searchData.education.length > 0 && (
            <CommandGroup heading="education">
              {searchData.education.map((edu) => (
                <CommandItem
                  key={edu.id}
                  value={`${edu.degree.toLowerCase()} ${edu.school.toLowerCase()} tag:education not concluded`}
                  onSelect={() => navigateTo(`/education/${edu.id}`)}
                >
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{edu.degree.toLowerCase()}</span>
                    <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                      at {edu.school.toLowerCase()}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Dynamic Search: Tech Stack Categories */}
          {(activeCategory === "all" || activeCategory === "stack") && searchData?.categories && searchData.categories.length > 0 && (
            <CommandGroup heading="tech stack">
              {searchData.categories.map((category) => (
                <CommandItem
                  key={category.name}
                  value={`${category.name.toLowerCase()} ${category.items.map((i) => `${i.name} ${i.description}`).join(" ").toLowerCase()} tag:stack`}
                  onSelect={() => navigateTo("/stack")}
                >
                  <Code className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1">
                    <span>{category.name.toLowerCase()}</span>
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
          {(activeCategory === "all" || activeCategory === "themes") && !themesLoading && themesData?.themes && (
            <CommandGroup heading="themes & appearance">
              {themesData.themes.map(({ name, value, icon, description, hidden }) => {
                if (value === "terminal") {
                  return (
                    <CommandItem
                      key={value}
                      value={`theme appearance ${name.toLowerCase()} ${value} terminal matrix retro`}
                      onSelect={() => handleThemeChange(value)}
                      className="relative"
                    >
                      <Terminal className="mr-2 h-4 w-4 text-green-500" aria-hidden="true" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{name.toLowerCase()}</span>
                          <Sparkles className="w-3 h-3 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="text-xs text-foreground/75 dark:text-muted-foreground">
                          secret retro terminal mode
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
                      value={`theme appearance ${name.toLowerCase()} ${value} ${description.toLowerCase()} tag:theme`}
                      onSelect={() => handleThemeChange(value)}
                    >
                      {renderThemeIcon(icon)}
                      <div className="flex-1">
                        <span>{name.toLowerCase()}</span>
                        <p className="text-xs text-foreground/75 dark:text-muted-foreground">{description.toLowerCase()}</p>
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
            <CommandGroup heading="special effects">
              <CommandItem onSelect={() => handleSpecialEffect("matrix")}>
                <Wand2 className="mr-2 h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <span>toggle matrix effect</span>
                  <p className="text-xs text-muted-foreground">enter the digital rain</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("glitch")}>
                <Wand2 className="mr-2 h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <span>toggle glitch effect</span>
                  <p className="text-xs text-muted-foreground">add digital distortion</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("crt")}>
                <Wand2 className="mr-2 h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <span>toggle crt effect</span>
                  <p className="text-xs text-muted-foreground">old school monitor scanlines</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("pixel")}>
                <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                <div className="flex-1">
                  <span>toggle pixel effect</span>
                  <p className="text-xs text-muted-foreground">8-bit pixelation filter</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("flip")}>
                <Wand2 className="mr-2 h-4 w-4 text-pink-500" />
                <div className="flex-1">
                  <span>flip ui</span>
                  <p className="text-xs text-muted-foreground">turn viewport upside down</p>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => handleSpecialEffect("reset")}>
                <Wand2 className="mr-2 h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <span>reset effects</span>
                  <p className="text-xs text-muted-foreground">clear all special effects</p>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>

        {/* Command Palette Shortcuts Footer */}
        <div className="border-t border-border/60 px-3.5 py-2.5 text-[11px] text-muted-foreground flex items-center justify-between bg-popover relative z-10 shrink-0 select-none lowercase">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Kbd keys={["up"]} size="xs" variant="default" />
              <Kbd keys={["down"]} size="xs" variant="default" />
              <span className="ml-0.5">navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <Kbd keys={["enter"]} size="xs" variant="default" />
              <span className="ml-0.5">select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Kbd keys={["esc"]} size="xs" variant="default" />
            <span className="ml-0.5">close</span>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}