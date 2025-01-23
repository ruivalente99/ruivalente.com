import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      themes: [
        {
          name: "System",
          value: "system",
          icon: "Laptop",
          description: "Match your system preferences",
        },
        {
          name: "Light",
          value: "light",
          icon: "Sun",
          description: "Clean and bright appearance",
        },
        {
          name: "Dark",
          value: "dark",
          icon: "Moon",
          description: "Easy on the eyes",
        },
        {
          name: "Dark Side",
          value: "dark-side",
          icon: "Moon",
          description: "Join the dark side",
          preview: {
            background: "#111111",
            foreground: "#ff0000",
            accent: "#ff0000",
          },
        },
        {
          name: "Pink",
          value: "pink",
          icon: "Palette",
          description: "Playful and vibrant",
          preview: {
            background: "#ffe5f4",
            foreground: "#4a0025",
            accent: "#ff80bf",
          },
        },
        {
          name: "Dracula",
          value: "dracula",
          icon: "Palette",
          description: "Classic dark theme",
          preview: {
            background: "#282a36",
            foreground: "#f8f8f2",
            accent: "#ff79c6",
          },
        },
        {
          name: "Retro",
          value: "retro",
          icon: "Palette",
          description: "90's computer vibes",
          preview: {
            background: "#ebf1e9",
            foreground: "#0e1f13",
            accent: "#40c463",
          },
        },
        {
          name: "Cyberpunk",
          value: "cyberpunk",
          icon: "Palette",
          description: "High-tech, low-life aesthetic",
          preview: {
            background: "#0a0b1b",
            foreground: "#00ffff",
            accent: "#ff00ff",
          },
        },
        {
          name: "Forest",
          value: "forest",
          icon: "Palette",
          description: "Natural and calming",
          preview: {
            background: "#0c1f14",
            foreground: "#b8e6cc",
            accent: "#2d9d5d",
          },
        },
        {
          name: "Sunset",
          value: "sunset",
          icon: "Palette",
          description: "Warm and inviting",
          preview: {
            background: "#fff9f5",
            foreground: "#331400",
            accent: "#ff6b1a",
          },
        },
        {
          name: "Terminal",
          value: "terminal",
          icon: "Terminal",
          description: "Classic terminal look",
          preview: {
            background: "#000000",
            foreground: "#00ff00",
            accent: "#00ff00",
          },
          hidden: true,
        },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}