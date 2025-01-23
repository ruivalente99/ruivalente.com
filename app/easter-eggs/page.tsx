"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Keyboard, Terminal, Bomb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EasterEggsPage() {
  const router = useRouter();

  const easterEggs = [
    {
      title: "Konami Code",
      description: "Enter the classic Konami Code to unlock terminal mode",
      sequence: "↑ ↑ ↓ ↓ ← → ← → B A",
      icon: Keyboard,
      effect: "Activates the retro terminal theme"
    },
    {
      title: "Terminal Mode",
      description: "A hidden theme with special effects",
      sequence: "Activated via Konami Code",
      icon: Terminal,
      effects: [
        {
          name: "Matrix Effect",
          command: "matrix",
          description: "Digital rain animation overlay"
        },
        {
          name: "Glitch Effect",
          command: "glitch",
          description: "Screen distortion effect"
        },
        {
          name: "CRT Effect",
          command: "crt",
          description: "Old school monitor scanlines"
        },
        {
          name: "Pixel Effect",
          command: "pixel",
          description: "8-bit pixelation filter"
        },
        {
          name: "Flip UI",
          command: "flip",
          description: "Turn everything upside down"
        },
        {
          name: "Reset Effects",
          command: "reset",
          description: "Clear all active effects"
        }
      ]
    },
    {
      title: "Dark Side Theme",
      description: "A special theme for Star Wars fans",
      sequence: "Select from theme menu",
      icon: Bomb,
      features: [
        "Red lightsaber glow effects",
        "Imperial-themed content",
        "Dark side loading screen",
        "Alternative profile data"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Easter Eggs</h1>
          </div>
        </div>

        <div className="grid gap-6">
          {easterEggs.map((egg, index) => (
            <motion.div
              key={egg.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <egg.icon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">{egg.title}</h2>
                </div>
                <p className="text-muted-foreground mb-4">{egg.description}</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Activation: </span>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {egg.sequence}
                    </code>
                  </p>
                  
                  {egg.effect && (
                    <p>
                      <span className="font-semibold">Effect: </span>
                      {egg.effect}
                    </p>
                  )}

                  {egg.effects && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Available Effects:</h3>
                      <div className="grid gap-2">
                        {egg.effects.map((effect) => (
                          <div
                            key={effect.command}
                            className="p-2 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{effect.name}</span>
                              <code className="text-xs px-2 py-1 bg-background rounded">
                                {effect.command}
                              </code>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {effect.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {egg.features && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {egg.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}