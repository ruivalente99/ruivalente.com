import { describe, test, expect } from "bun:test";
import { translations, type Locale, type TranslationDictionary } from "../lib/i18n/translations";

describe("Internationalization (i18n) Parity & Completeness", () => {
  const locales: Locale[] = ["en", "pt"];

  test("contains both English and Portuguese dictionaries", () => {
    expect(translations.en).toBeDefined();
    expect(translations.pt).toBeDefined();
  });

  test("all top-level sections exist in both languages", () => {
    const sections: Array<keyof TranslationDictionary> = [
      "header",
      "theme",
      "bento",
      "command",
      "footer",
      "common"
    ];

    for (const section of sections) {
      expect(translations.en[section]).toBeDefined();
      expect(translations.pt[section]).toBeDefined();
    }
  });

  test("bento section keys match exactly between English and Portuguese", () => {
    const enBentoKeys = Object.keys(translations.en.bento).sort();
    const ptBentoKeys = Object.keys(translations.pt.bento).sort();
    expect(enBentoKeys).toEqual(ptBentoKeys);

    for (const subKey of Object.keys(translations.en.bento)) {
      const enSubObj = (translations.en.bento as Record<string, unknown>)[subKey];
      const ptSubObj = (translations.pt.bento as Record<string, unknown>)[subKey];

      if (typeof enSubObj === "object" && enSubObj !== null) {
        expect(Object.keys(enSubObj).sort()).toEqual(Object.keys(ptSubObj as Record<string, unknown>).sort());
      }
    }
  });

  test("command palette keys match between English and Portuguese", () => {
    const enCommandKeys = Object.keys(translations.en.command).sort();
    const ptCommandKeys = Object.keys(translations.pt.command).sort();
    expect(enCommandKeys).toEqual(ptCommandKeys);
  });

  test("no translation strings are empty or undefined", () => {
    function assertNoEmptyStrings(obj: Record<string, unknown>, prefix = "") {
      for (const [key, val] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof val === "string") {
          expect(val.trim().length).toBeGreaterThan(0);
        } else if (typeof val === "object" && val !== null) {
          assertNoEmptyStrings(val as Record<string, unknown>, fullKey);
        }
      }
    }

    assertNoEmptyStrings(translations.en as unknown as Record<string, unknown>, "en");
    assertNoEmptyStrings(translations.pt as unknown as Record<string, unknown>, "pt");
  });
});
