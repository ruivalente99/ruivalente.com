"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, TranslationDictionary, translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationDictionary;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "ruivalente_locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "pt") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      } else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("pt")) {
        setLocaleState("pt");
        document.documentElement.lang = "pt";
      }
    } catch {
      // Ignore localStorage access failures
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore localStorage write failures
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "pt" : "en");
  };

  const currentTranslations = translations[locale] || translations.en;

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t: currentTranslations,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en",
      setLocale: () => {},
      toggleLocale: () => {},
      t: translations.en,
    };
  }
  return context;
}
