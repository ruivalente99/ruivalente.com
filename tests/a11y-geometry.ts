import { chromium } from "playwright";
import * as fs from "fs";

const axePath = require.resolve("axe-core/axe.min.js");
const axeSource = fs.readFileSync(axePath, "utf8");

async function runE2E() {
  console.log("Starting E2E Layout Geometry & Accessibility Audits...");
  
  const baseUrl = process.env.TEST_URL || "http://127.0.0.1:3000";
  console.log(`Target URL: ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 950 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    // 1. Bento Grid Geometry Audit
    console.log("\n[1/3] Auditing Bento Grid Row Heights...");
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(600);

    const bentoItems = page.locator("main > div > div.max-w-7xl > div");
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
    console.log("  PASSED: Bento grid row heights match within tolerance!");

    // 2. Interactive Controls Verification
    console.log("\n[2/3] Auditing Interactive Controls & i18n...");
    const langBtn = page.locator("header").getByRole("button", { name: /idioma|language/i });
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);
      const hobbiesText = await page.locator("#hobbies-heading").innerText();
      if (!hobbiesText.toLowerCase().includes("passatempos")) {
        throw new Error(`Expected Portuguese heading "passatempos", got "${hobbiesText}"`);
      }
      // Switch back to English
      await langBtn.click();
      await page.waitForTimeout(200);
      console.log("  PASSED: i18n switching verified!");
    }

    // 3. Axe-core Accessibility Audits
    console.log("\n[3/3] Running Axe-core WCAG 2.1 AA Accessibility Audits...");
    const routes = ["/", "/experience", "/education", "/projects", "/stack"];
    let totalViolations = 0;

    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(400);
      await page.evaluate(axeSource);

      const results = await page.evaluate(async () => {
        // @ts-ignore
        return await axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
          }
        });
      });

      const violations = results.violations;
      if (violations.length > 0) {
        console.error(`  FAIL [${route}]: ${violations.length} violations`);
        for (const v of violations) {
          console.error(`    - [${v.id}] ${v.help}`);
        }
        totalViolations += violations.length;
      } else {
        console.log(`  PASS [${route}]: 0 violations`);
      }
    }

    if (totalViolations > 0) {
      throw new Error(`Total accessibility violations: ${totalViolations}`);
    }
    console.log("  PASSED: 100% WCAG 2.1 AA compliance across all key routes!");

  } finally {
    await browser.close();
  }
}

runE2E().then(() => {
  console.log("\nAll E2E layout geometry and accessibility audits passed successfully!\n");
  process.exit(0);
}).catch((err) => {
  console.error("\nE2E Audit Failed:", err);
  process.exit(1);
});
