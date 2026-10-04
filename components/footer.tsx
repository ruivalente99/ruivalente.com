"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { useTerminalWindow } from "@/components/terminal/terminal-window-context";

export function Footer() {
  const { t } = useI18n();
  const { openTerminal } = useTerminalWindow();
  const currentYear = new Date().getFullYear();

  // Real <a href> links so crawlers (and no-JS visitors) can reach every section.
  const navigation = [
    { name: t.command.about, path: "/about" },
    { name: t.command.projects, path: "/projects" },
    { name: t.command.experience, path: "/experience" },
    { name: t.command.education, path: "/education" },
    { name: t.command.stack, path: "/stack" },
    { name: t.command.certificates, path: "/certificates" },
    { name: "terminal", path: "/terminal", action: () => openTerminal() },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 lowercase">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground lowercase">
            © {currentYear} {t.footer.rights}.
          </div>
          
          <nav aria-label="site" className="flex flex-wrap items-center justify-center gap-2">
            {navigation.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground lowercase"
              >
                <Link
                  href={item.path}
                  onClick={
                    item.action
                      ? (event) => {
                          // Terminal opens as an overlay; the href stays crawlable.
                          event.preventDefault();
                          item.action();
                        }
                      : undefined
                  }
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
