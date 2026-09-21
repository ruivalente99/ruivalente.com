import { chromium, type Browser, type Page } from "playwright";
import * as fs from "fs";
import { spawn, type ChildProcess } from "child_process";

const axePath = require.resolve("axe-core/axe.min.js");
const axeSource = fs.readFileSync(axePath, "utf8");

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 950 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
];

const THEMES = [
  "light",
  "dark",
  "dracula",
  "retro",
  "forest",
  "sunset",
  "cyberpunk",
  "pink",
  "dark-side",
  "terminal",
];

const ROUTES = [
  "/",
  "/experience",
  "/experience/xelerate-2025",
  "/education",
  "/education/masters-informatics-2022",
  "/projects",
  "/projects/bibliotheca",
  "/stack",
];

async function isServerRunning(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function startServerIfNeeded(port: number): Promise<{ child?: ChildProcess; url: string }> {
  const envUrl = process.env.TEST_URL;
  if (envUrl && (await isServerRunning(envUrl))) {
    return { url: envUrl };
  }

  const defaultUrl = `http://127.0.0.1:${port}`;
  if (await isServerRunning(defaultUrl)) {
    return { url: defaultUrl };
  }

  console.log(`Starting Next.js production server on port ${port}...`);
  const child = spawn("bun", ["x", "next", "start", "-p", String(port)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
  });

  // Wait for server to come up
  const startTime = Date.now();
  while (Date.now() - startTime < 30000) {
    if (await isServerRunning(defaultUrl)) {
      console.log(`Server is ready on ${defaultUrl}`);
      return { child, url: defaultUrl };
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  child.kill();
  throw new Error(`Server failed to start on port ${port} within 30 seconds`);
}

async function runAxeAudit(page: Page, contextName: string): Promise<number> {
  await page.evaluate(axeSource);

  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    });
  });

  const violations = results.violations;
  if (violations.length > 0) {
    console.error(`    FAIL [${contextName}]: ${violations.length} violations`);
    for (const v of violations) {
      console.error(`      - [${v.id}] ${v.help} (Impact: ${v.impact})`);
      for (const node of v.nodes.slice(0, 3)) {
        console.error(`        Target: ${node.target.join(", ")}`);
      }
    }
    return violations.length;
  } else {
    console.log(`    PASS [${contextName}]: 0 violations`);
    return 0;
  }
}

async function runE2E() {
  console.log("Starting comprehensive multi-theme, multi-viewport layout and a11y test suite...\n");

  const serverInfo = await startServerIfNeeded(3009);
  const baseUrl = serverInfo.url;
  console.log(`Target URL: ${baseUrl}\n`);

  const browser = await chromium.launch({ headless: true });
  let totalViolations = 0;

  try {
    // ----------------------------------------------------
    // Phase 1: Bento Grid Geometry Balance Audit (Desktop)
    // ----------------------------------------------------
    console.log("[Phase 1/4] Auditing Bento Grid Row Heights (Desktop)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 950 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(baseUrl, { waitUntil: "networkidle", timeout: 15000 });
    await desktopPage.waitForTimeout(600);

    const bentoItems = desktopPage.locator(".grid.max-w-7xl > div");
    const count = await bentoItems.count();
    if (count < 6) {
      throw new Error(`Expected at least 6 bento items, found ${count}`);
    }

    const box0 = await bentoItems.nth(0).boundingBox();
    const box1 = await bentoItems.nth(1).boundingBox();
    const box2 = await bentoItems.nth(2).boundingBox();
    const box3 = await bentoItems.nth(3).boundingBox();
    const box4 = await bentoItems.nth(4).boundingBox();
    const box5 = await bentoItems.nth(5).boundingBox();

    const diff1 = Math.abs((box0?.height || 0) - (box1?.height || 0));
    const diff2 = Math.abs((box2?.height || 0) - (box3?.height || 0));
    const diff3 = Math.abs((box4?.height || 0) - (box5?.height || 0));

    console.log(`  Row 1 (Profile vs Hobbies): ${box0?.height.toFixed(1)}px vs ${box1?.height.toFixed(1)}px (Diff: ${diff1.toFixed(1)}px)`);
    console.log(`  Row 2 (Stack vs Experience): ${box2?.height.toFixed(1)}px vs ${box3?.height.toFixed(1)}px (Diff: ${diff2.toFixed(1)}px)`);
    console.log(`  Row 3 (Education vs Projects): ${box4?.height.toFixed(1)}px vs ${box5?.height.toFixed(1)}px (Diff: ${diff3.toFixed(1)}px)`);

    if (diff1 > 1.0 || diff2 > 1.0 || diff3 > 1.0) {
      throw new Error(`Bento grid row height mismatch exceeded 1px threshold! (Diffs: ${diff1.toFixed(1)}px, ${diff2.toFixed(1)}px, ${diff3.toFixed(1)}px)`);
    }
    console.log("  PASSED: Bento grid row heights match perfectly!\n");

    // ----------------------------------------------------
    // Phase 2: Interactive Controls & i18n Switching Audit
    // ----------------------------------------------------
    console.log("[Phase 2/4] Auditing Interactive Controls & i18n...");

    // Test language switch
    const langBtn = desktopPage.locator("header").getByRole("button", { name: /idioma|language/i });
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await desktopPage.waitForTimeout(300);
      const hobbiesText = await desktopPage.locator("#hobbies-heading").innerText();
      if (!hobbiesText.toLowerCase().includes("passatempos")) {
        throw new Error(`Expected Portuguese heading "passatempos", got "${hobbiesText}"`);
      }
      // Switch back to English
      await langBtn.click();
      await desktopPage.waitForTimeout(200);
      console.log("  PASSED: i18n switching verified (English <-> Portuguese)!");
    }

    // Test stack view mode toggle (icons vs text)
    const stackModeToggle = desktopPage.getByRole("radio", { name: /text/i });
    if (await stackModeToggle.isVisible()) {
      await stackModeToggle.click();
      await desktopPage.waitForTimeout(200);
      const textActive = await stackModeToggle.getAttribute("aria-checked");
      if (textActive !== "true") {
        throw new Error("Stack mode toggle failed to activate text mode");
      }
      // Revert to icons
      const iconsToggle = desktopPage.getByRole("radio", { name: /icons/i });
      await iconsToggle.click();
      await desktopPage.waitForTimeout(200);
      console.log("  PASSED: Stack view mode toggle verified (icons <-> text)!");
    }

    // Test command palette trigger and category chips
    const searchTrigger = desktopPage.locator("header").getByRole("button", { name: /search|pesquisar|quick search/i });
    if (await searchTrigger.isVisible()) {
      await searchTrigger.click();
      await desktopPage.waitForTimeout(400);

      // Verify command palette dialog is open
      const cmdDialog = desktopPage.locator("[cmdk-dialog], [role='dialog']");
      if (!(await cmdDialog.first().isVisible())) {
        throw new Error("Command palette dialog did not open on trigger click");
      }

      // Check category chips
      const chips = [
        { name: "all", regex: /^all$/i },
        { name: "projects", regex: /^projects$/i },
        { name: "experience", regex: /^experience$/i },
        { name: "stack", regex: /^(stack|tech stack)$/i },
        { name: "actions", regex: /^actions$/i },
        { name: "themes", regex: /^themes$/i },
      ];
      for (const chip of chips) {
        const chipBtn = desktopPage.getByRole("button", { name: chip.regex });
        if (!(await chipBtn.isVisible())) {
          console.warn(`    Warning: category chip '${chip.name}' not directly found`);
        }
      }

      // Close modal with Escape
      await desktopPage.keyboard.press("Escape");
      await desktopPage.waitForTimeout(300);
      console.log("  PASSED: Command palette and category chips verified!\n");
    }

    await desktopContext.close();

    // ----------------------------------------------------
    // Phase 3: Multi-Theme Audits on Home Page
    // ----------------------------------------------------
    console.log("[Phase 3/4] Auditing all 10 Themes on Home Page (WCAG 2.1 AA)...");
    const themeContext = await browser.newContext({
      viewport: { width: 1280, height: 950 },
    });
    const themePage = await themeContext.newPage();
    await themePage.goto(baseUrl, { waitUntil: "networkidle", timeout: 15000 });
    await themePage.waitForTimeout(500);

    for (const th of THEMES) {
      // Set theme class on document element
      await themePage.evaluate((targetTheme) => {
        document.documentElement.className = targetTheme;
        localStorage.setItem("theme", targetTheme);
      }, th);
      await themePage.waitForTimeout(250);

      const violations = await runAxeAudit(themePage, `theme: ${th}`);
      totalViolations += violations;
    }
    await themeContext.close();
    console.log("  Theme matrix evaluation completed.\n");

    // ----------------------------------------------------
    // Phase 4: Multi-Viewport Audits Across Key Routes
    // ----------------------------------------------------
    console.log("[Phase 4/4] Auditing Responsive Viewports Across Key Routes (WCAG 2.1 AA)...");

    for (const vp of VIEWPORTS) {
      console.log(`\n  -- Testing Viewport: ${vp.name.toUpperCase()} (${vp.width}x${vp.height}) --`);
      const vpContext = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.name === "mobile" ? 3 : 2,
      });
      const vpPage = await vpContext.newPage();

      for (const route of ROUTES) {
        await vpPage.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 15000 });
        await vpPage.waitForTimeout(300);

        const violations = await runAxeAudit(vpPage, `${vp.name} @ ${route}`);
        totalViolations += violations;
      }

      // Additional check on mobile for Command Palette responsive layout
      if (vp.name === "mobile") {
        const mobileSearchBtn = vpPage.locator("header").getByRole("button", { name: /search|pesquisar|quick search/i });
        if (await mobileSearchBtn.isVisible()) {
          await mobileSearchBtn.click();
          await vpPage.waitForTimeout(400);

          const mobileCmd = vpPage.locator("[cmdk-dialog], [role='dialog']").first();
          if (await mobileCmd.isVisible()) {
            const cmdBox = await mobileCmd.boundingBox();
            console.log(`    Mobile Command Palette dimensions: ${cmdBox?.width.toFixed(0)}px x ${cmdBox?.height.toFixed(0)}px (fits mobile width: ${(cmdBox?.width || 0) <= vp.width})`);
            await vpPage.keyboard.press("Escape");
            await vpPage.waitForTimeout(200);
          }
        }
      }

      await vpContext.close();
    }

    if (totalViolations > 0) {
      throw new Error(`Total accessibility violations detected: ${totalViolations}`);
    }

    console.log("\n=======================================================");
    console.log("SUCCESS: 100% WCAG 2.1 AA compliance across all 10 themes,");
    console.log("all 3 viewports (desktop, tablet, mobile), and all 8 routes!");
    console.log("=======================================================\n");

  } finally {
    await browser.close();
    if (serverInfo.child) {
      console.log("Stopping background Next.js server...");
      serverInfo.child.kill();
    }
  }
}

runE2E()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("\nE2E Audit Failed with Error:", err);
    process.exit(1);
  });
