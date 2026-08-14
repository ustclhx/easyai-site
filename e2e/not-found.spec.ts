import { test, expect } from "./fixtures/consult";

test("unknown routes recover to home", async ({ page, site }) => {
  await site.goto("/this-page-does-not-exist");

  await expect(page.getByRole("heading", { level: 1, name: /走错一步/ })).toBeVisible();
  await page.getByRole("link", { name: "返回首页" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1, name: /让小团队/ })).toBeVisible();
});
