"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { isMobile } from "@/lib/utils";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  content: string;
  type: 'input' | 'error' | 'success' | 'info' | 'prompt';
  timestamp?: number;
  link?: string;
}

const commands = [
  { name: "ls", description: "list sections" },
  { 
    name: "cd", 
    description: "navigate to section",
    subcommands: ["projects", "experience", "education", "certifications", "hobbies"]
  },
  { name: "help", description: "show available commands" },
  { name: "clear", description: "clear terminal" },
  { name: "history", description: "show command history" },
  { name: "theme", description: "change theme", subcommands: ["light", "dark", "system"] },
  { name: "restart", description: "reload the page", action: () => window.location.reload() },
  { name: "exit", description: "close terminal" },
];

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { content: "Welcome to terminal mode", type: 'info', timestamp: Date.now() },
    { content: "Type 'help' for available commands", type: 'info', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("/");
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && isMobile()) {
      toast({
        title: "Mobile Device Detected",
        description: "The terminal works better in desktop mode. Mobile mode is a work in progress.",
        duration: 5000,
      });
    }
  }, [isOpen, toast]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (input.length > 0) {
      const [cmd, ...args] = input.split(" ");
      let filtered: string[] = [];

      if (args.length === 0) {
        filtered = commands
          .map(c => c.name)
          .filter(name => name.startsWith(cmd.toLowerCase()));
      } else {
        const command = commands.find(c => c.name === cmd.toLowerCase());
        if (command?.subcommands) {
          const searchTerm = args[0].toLowerCase();
          filtered = command.subcommands.filter(sub => 
            sub.toLowerCase().startsWith(searchTerm)
          );
        }
      }

      setSuggestions(filtered);
      setSelectedSuggestion(-1);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleCommand = (cmd: string) => {
    const timestamp = Date.now();
    setHistory(prev => [...prev, { content: `$ ${cmd}`, type: 'input', timestamp }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const commandObj = commands.find(c => c.name === command);

    if (commandObj) {
      switch (command) {
        case "theme":
          if (args[0] && ["light", "dark", "system"].includes(args[0])) {
            setTheme(args[0]);
            setHistory(prev => [...prev, { 
              content: `Theme changed to ${args[0]}`, 
              type: 'success',
              timestamp 
            }]);
          } else {
            setHistory(prev => [...prev, { 
              content: "Available themes: light, dark, system", 
              type: 'info',
              timestamp 
            }]);
          }
          break;

        case "restart":
          setHistory(prev => [...prev, { 
            content: "Restarting application...", 
            type: 'info',
            timestamp 
          }]);
          setTimeout(() => commandObj.action?.(), 1000);
          break;

        case "history":
          const historyLines = commandHistory.map((cmd, index) => ({
            content: `${index + 1}  ${cmd}`,
            type: 'success' as const,
            timestamp
          }));
          setHistory(prev => [...prev, ...historyLines]);
          break;

        case "ls":
          const sectionsList = commands
            .find(c => c.name === "cd")
            ?.subcommands
            ?.map(section => ({
              content: section,
              type: 'success' as const,
              timestamp
            })) || [];
          setHistory(prev => [...prev, ...sectionsList]);
          break;

        case "cd":
          if (args[0] === "..") {
            setCurrentPath("/");
            setHistory(prev => [...prev, { 
              content: "Returned to root directory", 
              type: 'info', 
              timestamp 
            }]);
          } else if (commandObj.subcommands?.includes(args[0])) {
            setCurrentPath(`/${args[0]}`);
            setHistory(prev => [...prev, { 
              content: `Changed directory to ${args[0]}`, 
              type: 'info', 
              timestamp 
            }]);
          } else {
            setHistory(prev => [...prev, { 
              content: "Directory not found", 
              type: 'error', 
              timestamp 
            }]);
          }
          break;

        case "help":
          const helpContent = [
            { content: "Available commands:", type: 'info' as const, timestamp },
            ...commands.map(cmd => ({
              content: `${cmd.name} - ${cmd.description}`,
              type: 'success' as const,
              timestamp
            }))
          ];
          setHistory(prev => [...prev, ...helpContent]);
          break;

        case "clear":
          setHistory([]);
          break;

        case "exit":
          onClose();
          break;
      }
    } else {
      setHistory(prev => [...prev, { 
        content: `Command not found: ${command}`, 
        type: 'error',
        timestamp 
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setSuggestions([]);
      setSelectedSuggestion(-1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        const suggestion = suggestions[selectedSuggestion === -1 ? 0 : selectedSuggestion];
        const [cmd, ...args] = input.split(" ");
        if (args.length > 0 && cmd.toLowerCase() === "cd") {
          setInput(`cd ${suggestion}`);
        } else {
          setInput(suggestion);
        }
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (commandHistory.length > 0) {
        setHistoryIndex(prev => {
          const newIndex = prev < commandHistory.length - 1 ? prev + 1 : prev;
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
          return newIndex;
        });
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev >= suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (historyIndex > -1) {
        setHistoryIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          setInput(newIndex === -1 ? "" : commandHistory[commandHistory.length - 1 - newIndex]);
          return newIndex;
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-none p-0 overflow-hidden">
        <DialogTitle className="sr-only">Terminal Mode</DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="font-mono text-sm bg-background"
        >
          <ScrollArea className="h-[400px] w-full p-4" ref={scrollAreaRef}>
            <AnimatePresence>
              {history.map((line, i) => (
                <motion.div
                  key={`${i}-${line.timestamp}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-1 ${
                    line.type === 'error' ? 'text-red-500' :
                    line.type === 'success' ? 'text-green-500' :
                    line.type === 'info' ? 'text-blue-500' :
                    'text-foreground'
                  }`}
                >
                  {line.link ? (
                    <a
                      href={line.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {line.content}
                    </a>
                  ) : (
                    line.content
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="flex items-center relative mt-2">
              <span className="text-green-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-foreground"
                autoFocus
              />
            </div>
          </ScrollArea>

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-4 right-4 bottom-16 bg-background border rounded-md shadow-lg overflow-hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`px-3 py-1.5 cursor-pointer transition-colors ${
                      index === selectedSuggestion ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => {
                      setInput(suggestion);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}