import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures/consult";

test.describe("accessibility", () => {
  test("home has no serious axe violations", async ({ page, site }) => {
    await site.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /让小团队/ })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude('[role="img"]')
      .analyze();

    const serious = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });

  test("consult dialog has no serious axe violations", async ({ page, site, consult }) => {
    await site.goto("/");
    await site.openConsultFromHeader();
    await expect(consult.root()).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("dialog")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
