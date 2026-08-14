import { test, expect } from "./fixtures/consult";

test.describe("mobile navigation", () => {
  test("hamburger opens, navigates, and closes", async ({ page, site }) => {
    await site.goto("/");

    await site.openMobileMenu();
    await expect(page.getByRole("button", { name: "打开导航" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(site.mobileNav()).toBeVisible();

    await site.mobileNav().getByRole("link", { name: "关于我们" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1, name: /AI 的价值/ })).toBeVisible();
    await expect(site.mobileNav()).toBeHidden();
  });

  test("mobile menu can open the consult dialog", async ({ site, consult }) => {
    await site.goto("/");
    await site.openMobileMenu();
    await site.mobileNav().getByRole("button", { name: "咨询合作" }).click();

    await expect(consult.root()).toBeVisible();
    await expect(site.mobileNav()).toBeHidden();
  });
});
