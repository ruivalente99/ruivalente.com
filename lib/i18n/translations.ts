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
      search: "Search",
      searchPlaceholder: "Type a command or search...",
      theme: "Theme",
      language: "Language",
      animations: "Block Animations",
      animationsEnabled: "Assembly animations enabled",
      animationsDisabled: "Assembly animations disabled",
    },
    theme: {
      appearance: "Appearance",
      mode: "Mode",
      light: "Light",
      dark: "Dark",
      system: "System",
      palettes: "Color Themes",
      darkSide: "Dark Side",
      dracula: "Dracula",
      retro: "Retro",
      forest: "Forest",
      sunset: "Sunset",
      cyberpunk: "Cyberpunk",
      pink: "Pink",
    },
    bento: {
      profile: {
        title: "Profile",
        role: "Frontend Software Engineer",
        experience: "4+ years experience",
        location: "Portugal",
        status: "Available for projects",
        downloadCv: "Download CV",
        viewProfile: "View profile",
      },
      hobbies: {
        title: "hobbies",
        gaming: "Gaming",
        music: "Music",
        photography: "Photography",
        reading: "Reading",
        coffee: "Coffee",
        tech: "Tech & Hardware",
      },
      stack: {
        title: "tech stack",
        viewAll: "view all",
        subtitle: "Core technologies and daily engineering tools",
      },
      experience: {
        title: "experience",
        viewAll: "view all",
        present: "Present",
      },
      education: {
        title: "education",
        viewAll: "view all",
        masters: "Master's Degree",
        bachelors: "Bachelor's Degree",
      },
      projects: {
        title: "featured projects",
        viewAll: "view all",
        demo: "demo",
        source: "github",
        featured: "Featured",
        all: "All",
      },
    },
    command: {
      searchPlaceholder: "Search commands or jump to section...",
      noResults: "No results found.",
      navigation: "Navigation",
      projects: "Projects",
      themes: "Themes",
      actions: "Actions",
      home: "Home",
      experience: "Experience",
      education: "Education",
      stack: "Tech Stack",
      allProjects: "Projects Catalog",
      downloadResume: "Download Resume (PDF)",
      toggleLanguage: "Switch Language to Portuguese",
    },
    footer: {
      builtWith: "Engineered with Next.js 15, React 19, and Tailwind CSS",
      rights: "All rights reserved",
    },
    common: {
      back: "Back",
      technologies: "Technologies",
      overview: "Overview",
      highlights: "Highlights",
    },
  },
  pt: {
    header: {
      search: "Pesquisar",
      searchPlaceholder: "Digite um comando ou pesquise...",
      theme: "Tema",
      language: "Idioma",
      animations: "Animações de Blocos",
      animationsEnabled: "Animações de montagem ativadas",
      animationsDisabled: "Animações de montagem desativadas",
    },
    theme: {
      appearance: "Aparência",
      mode: "Modo",
      light: "Claro",
      dark: "Escuro",
      system: "Sistema",
      palettes: "Temas de Cor",
      darkSide: "Lado Negro",
      dracula: "Dracula",
      retro: "Retro",
      forest: "Floresta",
      sunset: "Pôr do Sol",
      cyberpunk: "Cyberpunk",
      pink: "Rosa",
    },
    bento: {
      profile: {
        title: "Perfil",
        role: "Engenheiro de Software Frontend",
        experience: "4+ anos de experiência",
        location: "Portugal",
        status: "Disponível para projetos",
        downloadCv: "Descarregar CV",
        viewProfile: "Ver perfil",
      },
      hobbies: {
        title: "passatempos",
        gaming: "Jogos",
        music: "Música",
        photography: "Fotografia",
        reading: "Leitura",
        coffee: "Café",
        tech: "Hardware e Tecnologia",
      },
      stack: {
        title: "stack tecnológica",
        viewAll: "ver tudo",
        subtitle: "Tecnologias principais e ferramentas de engenharia diárias",
      },
      experience: {
        title: "experiência",
        viewAll: "ver tudo",
        present: "Presente",
      },
      education: {
        title: "educação",
        viewAll: "ver tudo",
        masters: "Mestrado",
        bachelors: "Licenciatura",
      },
      projects: {
        title: "projetos em destaque",
        viewAll: "ver todos",
        demo: "demo",
        source: "código",
        featured: "Destaques",
        all: "Todos",
      },
    },
    command: {
      searchPlaceholder: "Pesquisar comandos ou navegar...",
      noResults: "Nenhum resultado encontrado.",
      navigation: "Navegação",
      projects: "Projetos",
      themes: "Temas",
      actions: "Ações",
      home: "Início",
      experience: "Experiência",
      education: "Educação",
      stack: "Stack Tecnológica",
      allProjects: "Catálogo de Projetos",
      downloadResume: "Descarregar Currículo (PDF)",
      toggleLanguage: "Mudar Idioma para Inglês",
    },
    footer: {
      builtWith: "Desenvolvido com Next.js 15, React 19 e Tailwind CSS",
      rights: "Todos os direitos reservados",
    },
    common: {
      back: "Voltar",
      technologies: "Tecnologias",
      overview: "Visão Geral",
      highlights: "Destaques",
    },
  },
};
