export type Locale = "en" | "pt";

export interface TranslationDictionary {
  header: {
    search: string;
    searchPlaceholder: string;
    theme: string;
    language: string;
    animations: string;
    animationsEnabled: string;
    animationsDisabled: string;
  };
  theme: {
    appearance: string;
    mode: string;
    light: string;
    dark: string;
    system: string;
    palettes: string;
    darkSide: string;
    dracula: string;
    retro: string;
    forest: string;
    sunset: string;
    cyberpunk: string;
    pink: string;
  };
  bento: {
    profile: {
      title: string;
      role: string;
      experience: string;
      location: string;
      status: string;
      downloadCv: string;
      viewProfile: string;
    };
    hobbies: {
      title: string;
      gaming: string;
      music: string;
      photography: string;
      reading: string;
      coffee: string;
      tech: string;
    };
    stack: {
      title: string;
      viewAll: string;
      subtitle: string;
    };
    experience: {
      title: string;
      viewAll: string;
      present: string;
    };
    education: {
      title: string;
      viewAll: string;
      masters: string;
      bachelors: string;
    };
    projects: {
      title: string;
      viewAll: string;
      demo: string;
      source: string;
      featured: string;
      all: string;
    };
  };
  command: {
    searchPlaceholder: string;
    noResults: string;
    navigation: string;
    projects: string;
    themes: string;
    actions: string;
    home: string;
    experience: string;
    education: string;
    stack: string;
    allProjects: string;
    downloadResume: string;
    toggleLanguage: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
  common: {
    back: string;
    technologies: string;
    overview: string;
    highlights: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    header: {
      search: "search",
      searchPlaceholder: "type a command or search...",
      theme: "theme",
      language: "language",
      animations: "block animations",
      animationsEnabled: "assembly animations enabled",
      animationsDisabled: "assembly animations disabled",
    },
    theme: {
      appearance: "appearance",
      mode: "mode",
      light: "light",
      dark: "dark",
      system: "system",
      palettes: "color themes",
      darkSide: "dark side",
      dracula: "dracula",
      retro: "retro",
      forest: "forest",
      sunset: "sunset",
      cyberpunk: "cyberpunk",
      pink: "pink",
    },
    bento: {
      profile: {
        title: "profile",
        role: "frontend software engineer",
        experience: "4+ years experience",
        location: "portugal",
        status: "available for projects",
        downloadCv: "download cv",
        viewProfile: "view profile",
      },
      hobbies: {
        title: "hobbies",
        gaming: "gaming",
        music: "music",
        photography: "photography",
        reading: "reading",
        coffee: "coffee",
        tech: "tech & hardware",
      },
      stack: {
        title: "tech stack",
        viewAll: "view all",
        subtitle: "core technologies and daily engineering tools",
      },
      experience: {
        title: "experience",
        viewAll: "view all",
        present: "present",
      },
      education: {
        title: "education",
        viewAll: "view all",
        masters: "master's degree",
        bachelors: "bachelor's degree",
      },
      projects: {
        title: "featured projects",
        viewAll: "view all",
        demo: "demo",
        source: "github",
        featured: "featured",
        all: "all",
      },
    },
    command: {
      searchPlaceholder: "search commands or jump to section...",
      noResults: "no results found.",
      navigation: "navigation",
      projects: "projects",
      themes: "themes",
      actions: "actions",
      home: "home",
      experience: "experience",
      education: "education",
      stack: "tech stack",
      allProjects: "projects catalog",
      downloadResume: "download resume (pdf)",
      toggleLanguage: "switch language to portuguese",
    },
    footer: {
      builtWith: "engineered with next.js 15, react 19, and tailwind css",
      rights: "all rights reserved",
    },
    common: {
      back: "back",
      technologies: "technologies",
      overview: "overview",
      highlights: "highlights",
    },
  },
  pt: {
    header: {
      search: "pesquisar",
      searchPlaceholder: "digite um comando ou pesquise...",
      theme: "tema",
      language: "idioma",
      animations: "animações de blocos",
      animationsEnabled: "animações de montagem ativadas",
      animationsDisabled: "animações de montagem desativadas",
    },
    theme: {
      appearance: "aparência",
      mode: "modo",
      light: "claro",
      dark: "escuro",
      system: "sistema",
      palettes: "temas de cor",
      darkSide: "lado negro",
      dracula: "dracula",
      retro: "retro",
      forest: "floresta",
      sunset: "pôr do sol",
      cyberpunk: "cyberpunk",
      pink: "rosa",
    },
    bento: {
      profile: {
        title: "perfil",
        role: "engenheiro de software frontend",
        experience: "4+ anos de experiência",
        location: "portugal",
        status: "disponível para projetos",
        downloadCv: "descarregar cv",
        viewProfile: "ver perfil",
      },
      hobbies: {
        title: "passatempos",
        gaming: "jogos",
        music: "música",
        photography: "fotografia",
        reading: "leitura",
        coffee: "café",
        tech: "hardware e tecnologia",
      },
      stack: {
        title: "stack tecnológica",
        viewAll: "ver tudo",
        subtitle: "tecnologias principais e ferramentas de engenharia diárias",
      },
      experience: {
        title: "experiência",
        viewAll: "ver tudo",
        present: "presente",
      },
      education: {
        title: "educação",
        viewAll: "ver tudo",
        masters: "mestrado",
        bachelors: "licenciatura",
      },
      projects: {
        title: "projetos em destaque",
        viewAll: "ver todos",
        demo: "demo",
        source: "código",
        featured: "destaques",
        all: "todos",
      },
    },
    command: {
      searchPlaceholder: "pesquisar comandos ou navegar...",
      noResults: "nenhum resultado encontrado.",
      navigation: "navegação",
      projects: "projetos",
      themes: "temas",
      actions: "ações",
      home: "início",
      experience: "experiência",
      education: "educação",
      stack: "stack tecnológica",
      allProjects: "catálogo de projetos",
      downloadResume: "descarregar currículo (pdf)",
      toggleLanguage: "mudar idioma para inglês",
    },
    footer: {
      builtWith: "desenvolvido com next.js 15, react 19 e tailwind css",
      rights: "todos os direitos reservados",
    },
    common: {
      back: "voltar",
      technologies: "tecnologias",
      overview: "visão geral",
      highlights: "destaques",
    },
  },
};
