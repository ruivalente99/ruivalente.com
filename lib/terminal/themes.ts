export interface TermTheme {
  name: string;
  desc: string;
  /** themes that need to be unlocked via easter eggs */
  hidden?: boolean;
  colors: {
    bg: string;
    fg: string;
    dim: string;
    accent: string;
    green: string;
    red: string;
    yellow: string;
    cyan: string;
    magenta: string;
    selection: string;
  };
}

export const TERM_THEMES: TermTheme[] = [
  {
    name: "matrix",
    desc: "green phosphor, the only true terminal",
    colors: {
      bg: "#050905",
      fg: "#33ff66",
      dim: "#1d8c44",
      accent: "#aaffcc",
      green: "#33ff66",
      red: "#ff5555",
      yellow: "#f1fa8c",
      cyan: "#66ffe3",
      magenta: "#ff79c6",
      selection: "#0f3d22",
    },
  },
  {
    name: "dracula",
    desc: "classic dark, bela lugosi approved",
    colors: {
      bg: "#282a36",
      fg: "#f8f8f2",
      dim: "#6272a4",
      accent: "#bd93f9",
      green: "#50fa7b",
      red: "#ff5555",
      yellow: "#f1fa8c",
      cyan: "#8be9fd",
      magenta: "#ff79c6",
      selection: "#44475a",
    },
  },
  {
    name: "cyberpunk",
    desc: "high tech, low life",
    colors: {
      bg: "#0a0b1b",
      fg: "#00ffff",
      dim: "#3d6e8c",
      accent: "#ff00ff",
      green: "#00ff9f",
      red: "#ff2a6d",
      yellow: "#f9f871",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      selection: "#1c2541",
    },
  },
  {
    name: "nord",
    desc: "cold. very cold.",
    colors: {
      bg: "#2e3440",
      fg: "#d8dee9",
      dim: "#616e88",
      accent: "#88c0d0",
      green: "#a3be8c",
      red: "#bf616a",
      yellow: "#ebcb8b",
      cyan: "#8fbcbb",
      magenta: "#b48ead",
      selection: "#434c5e",
    },
  },
  {
    name: "gruvbox",
    desc: "warm and retro",
    colors: {
      bg: "#282828",
      fg: "#ebdbb2",
      dim: "#928374",
      accent: "#fe8019",
      green: "#b8bb26",
      red: "#fb4934",
      yellow: "#fabd2f",
      cyan: "#8ec07c",
      magenta: "#d3869b",
      selection: "#3c3836",
    },
  },
  {
    name: "monokai",
    desc: "the sublime classic",
    colors: {
      bg: "#272822",
      fg: "#f8f8f2",
      dim: "#75715e",
      accent: "#66d9ef",
      green: "#a6e22e",
      red: "#f92672",
      yellow: "#e6db74",
      cyan: "#66d9ef",
      magenta: "#ae81ff",
      selection: "#49483e",
    },
  },
  {
    name: "solarized",
    desc: "for people with opinions about contrast",
    colors: {
      bg: "#002b36",
      fg: "#839496",
      dim: "#586e75",
      accent: "#268bd2",
      green: "#859900",
      red: "#dc322f",
      yellow: "#b58900",
      cyan: "#2aa198",
      magenta: "#d33682",
      selection: "#073642",
    },
  },
  {
    name: "ubuntu",
    desc: "aubergine nostalgia",
    colors: {
      bg: "#300a24",
      fg: "#eeeeec",
      dim: "#a08599",
      accent: "#e95420",
      green: "#8ae234",
      red: "#ef2929",
      yellow: "#fce94f",
      cyan: "#34e2e2",
      magenta: "#ad7fa8",
      selection: "#4e1f41",
    },
  },
  {
    name: "paper",
    desc: "light mode. brave choice.",
    colors: {
      bg: "#f5f1e8",
      fg: "#3a3530",
      dim: "#8c8378",
      accent: "#c05b2c",
      green: "#3f7d3f",
      red: "#c0392b",
      yellow: "#9a7d0a",
      cyan: "#16777e",
      magenta: "#8e44ad",
      selection: "#e0d8c8",
    },
  },
  {
    name: "sith",
    desc: "the dark side of the force",
    hidden: true,
    colors: {
      bg: "#0a0000",
      fg: "#ff3b30",
      dim: "#7a1f1a",
      accent: "#ffffff",
      green: "#ff6b5e",
      red: "#ff0000",
      yellow: "#ffb000",
      cyan: "#ff8a80",
      magenta: "#ff4569",
      selection: "#3d0a05",
    },
  },
  {
    name: "synthwave",
    desc: "konami-grade neon. you earned this.",
    hidden: true,
    colors: {
      bg: "#241b2f",
      fg: "#f8f8f2",
      dim: "#8a7aa0",
      accent: "#ff7edb",
      green: "#72f1b8",
      red: "#fe4450",
      yellow: "#fede5d",
      cyan: "#36f9f6",
      magenta: "#ff7edb",
      selection: "#463465",
    },
  },
];

export const DEFAULT_THEME = "matrix";

export function getTheme(name: string): TermTheme {
  return TERM_THEMES.find((t) => t.name === name) || TERM_THEMES[0];
}
