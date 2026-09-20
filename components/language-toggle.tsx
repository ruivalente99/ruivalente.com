"use client";

import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();

  const isPt = locale === "pt";
  const ariaLabel = isPt 
    ? "Switch language to English" 
    : "Mudar idioma para Português";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "relative h-8 px-2 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80",
        "text-muted-foreground hover:text-foreground transition-all duration-150 flex items-center gap-1 cursor-pointer",
        "active:scale-[0.96] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono text-[11px] font-semibold"
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <span className={cn("transition-colors", !isPt ? "text-primary font-bold" : "opacity-50")}>
        EN
      </span>
      <span className="opacity-30">/</span>
      <span className={cn("transition-colors", isPt ? "text-primary font-bold" : "opacity-50")}>
        PT
      </span>
    </button>
  );
}
