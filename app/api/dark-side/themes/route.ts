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
          icon: "Bomb",
          description: "Join the dark side",
          preview: {
            background: "#111111",
            foreground: "#ff0000",
            accent: "#ff0000",
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
        }
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}