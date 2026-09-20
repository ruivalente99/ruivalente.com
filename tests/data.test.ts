import { describe, test, expect } from "bun:test";
import fs from "fs";
import path from "path";

import experienceData from "../lib/data/experience.json";
import educationData from "../lib/data/education.json";
import projectsData from "../lib/data/projects.json";
import stackData from "../lib/data/stack.json";
import certificatesData from "../lib/data/certificates.json";

describe("Data Integrity & Schema Validation", () => {
  describe("Experience Data", () => {
    test("contains valid experience list with at least 3 entries", () => {
      expect(experienceData.experiences).toBeDefined();
      expect(experienceData.experiences.length).toBeGreaterThanOrEqual(3);
    });

    test("has Xelerate | Techem as the primary active experience", () => {
      const topExp = experienceData.experiences[0];
      expect(topExp.id).toBe("xelerate-2025");
      expect(topExp.role).toBe("Frontend Engineer");
      expect(topExp.company).toBe("Xelerate | Techem");
      expect(topExp.year).toBe("Dec 2025 — Present");
      expect(topExp.companyUrl).toBe("https://www.techem.com");
      expect(topExp.skills.length).toBeGreaterThan(0);
    });

    test("has Openvia marked as completed", () => {
      const openvia = experienceData.experiences.find((e) => e.id === "openvia-2022");
      expect(openvia).toBeDefined();
      expect(openvia?.company).toBe("Openvia");
      expect(openvia?.year).toBe("Jun 2022 — Nov 2025");
    });

    test("all experience content markdown files exist and contain content", () => {
      for (const exp of experienceData.experiences) {
        expect(exp.contentPath).toBeDefined();
        const fullPath = path.join(process.cwd(), exp.contentPath);
        expect(fs.existsSync(fullPath)).toBe(true);
        const content = fs.readFileSync(fullPath, "utf8");
        expect(content.trim().length).toBeGreaterThan(50);
        // Ensure no emojis exist in case study files
        const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u27BF/;
        expect(emojiRegex.test(content)).toBe(false);
      }
    });
  });

  describe("Education Data", () => {
    test("contains valid education list with at least 2 entries", () => {
      expect(educationData.education).toBeDefined();
      expect(educationData.education.length).toBeGreaterThanOrEqual(2);
    });

    test("has Masters degree marked as 2021 — 2026 (In Progress)", () => {
      const masters = educationData.education.find((e) => e.id === "masters-informatics-2022");
      expect(masters).toBeDefined();
      expect(masters?.degree).toBe("Master's Degree in Informatics Engineering");
      expect(masters?.school).toBe("University of Trás-os-Montes and Alto Douro");
      expect(masters?.year).toBe("2021 — 2026 (In Progress)");
    });

    test("all education content markdown files exist and contain content", () => {
      for (const edu of educationData.education) {
        expect(edu.contentPath).toBeDefined();
        const fullPath = path.join(process.cwd(), edu.contentPath);
        expect(fs.existsSync(fullPath)).toBe(true);
        const content = fs.readFileSync(fullPath, "utf8");
        expect(content.trim().length).toBeGreaterThan(50);
        const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u27BF/;
        expect(emojiRegex.test(content)).toBe(false);
      }
    });
  });

  describe("Projects Data", () => {
    test("contains all featured projects including newly added and preserved ones", () => {
      const ids = projectsData.projects.map((p) => p.id);
      expect(ids).toContain("bibliotheca");
      expect(ids).toContain("papyrus");
      expect(ids).toContain("sappientus");
      expect(ids).toContain("imaguncula");
      expect(ids).toContain("lazy-life");
      expect(ids).toContain("cass");
    });

    test("all projects have required fields, valid content paths, and existing image assets", () => {
      for (const proj of projectsData.projects) {
        expect(proj.id).toBeDefined();
        expect(proj.title).toBeDefined();
        expect(proj.description).toBeDefined();
        expect(proj.image).toBeDefined();
        const imagePath = path.join(process.cwd(), "public", proj.image);
        expect(fs.existsSync(imagePath)).toBe(true);
        expect(proj.contentPath).toBeDefined();
        const contentPath = path.join(process.cwd(), proj.contentPath);
        expect(fs.existsSync(contentPath)).toBe(true);
      }
    });
  });

  describe("Tech Stack Data", () => {
    test("AI Stack contains strictly Copilot, Antigravity, and Claude Code", () => {
      const aiCategory = stackData.stack.find(
        (c) => c.category.toLowerCase().includes("ai")
      );
      expect(aiCategory).toBeDefined();
      const toolIcons = aiCategory?.items.map((i) => i.icon.toLowerCase()) || [];

      expect(toolIcons).toContain("githubcopilot");
      expect(toolIcons).toContain("antigravity");
      expect(toolIcons).toContain("claudecode");

      // Verify removed tools
      expect(toolIcons).not.toContain("kiro");
      expect(toolIcons).not.toContain("warp");
      expect(toolIcons).not.toContain("lovable");
      expect(toolIcons).not.toContain("gemini");
      expect(toolIcons).not.toContain("gitkraken");
    });
  });

  describe("Certificates Data", () => {
    test("contains valid certificates list", () => {
      expect(certificatesData.certificates).toBeDefined();
      expect(certificatesData.certificates.length).toBeGreaterThan(0);
      for (const cert of certificatesData.certificates) {
        expect(cert.name).toBeDefined();
        expect(cert.issuer).toBeDefined();
        expect(cert.year).toBeDefined();
      }
    });
  });
});
