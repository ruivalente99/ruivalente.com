import { describe, test, expect } from "bun:test";
import { generatePageMetadata, generateStructuredData, createAIContextPrompts } from "../lib/metadata";

describe("Metadata & SEO Structured Data", () => {
  test("generates base page metadata with essential keywords and company names", () => {
    const meta = generatePageMetadata({
      title: "Test Page",
      description: "Test description for unit testing",
    });

    expect(meta.title).toBe("Test Page");
    expect(meta.description).toBe("Test description for unit testing");
    expect(meta.keywords).toBeDefined();

    const keywords = meta.keywords as string[];
    expect(keywords).toContain("Rui Valente");
    expect(keywords).toContain("Frontend Developer");
    expect(keywords).toContain("Xelerate");
    expect(keywords).toContain("Techem");
    expect(keywords).toContain("Openvia");
    expect(keywords).toContain("Neoception");
  });

  test("generates structured data for default person", () => {
    const structuredData = generateStructuredData("home") as any;
    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(structuredData["@type"]).toBe("Person");
    expect(structuredData.name).toBe("Rui Valente");
    expect(structuredData.worksFor.name).toBe("Xelerate | Techem");
    expect(structuredData.worksFor.url).toBe("https://www.techem.com");
  });

  test("generates structured data for experience page with occupations", () => {
    const structuredData = generateStructuredData("experience") as any;
    expect(structuredData.hasOccupation).toBeDefined();
    expect(structuredData.hasOccupation.length).toBeGreaterThanOrEqual(3);

    const xelerateOcc = structuredData.hasOccupation.find(
      (o: any) => o.occupationLocation.name === "Xelerate | Techem"
    );
    expect(xelerateOcc).toBeDefined();
    expect(xelerateOcc.name).toBe("Frontend Engineer");
    expect(xelerateOcc.startDate).toBe("2025");

    const openviaOcc = structuredData.hasOccupation.find(
      (o: any) => o.occupationLocation.name === "Openvia"
    );
    expect(openviaOcc).toBeDefined();
    expect(openviaOcc.endDate).toBe("2025");
  });

  test("generates AI context prompts with Xelerate | Techem", () => {
    const prompts = createAIContextPrompts("page", "testing context") as Record<string, string>;
    expect(prompts["ai-current-role"]).toContain("Xelerate | Techem");
    expect(prompts["ai-developer"]).toContain("Rui Valente");
  });
});
