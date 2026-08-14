import { test, expect } from "./fixtures/consult";

test.describe("desktop navigation", () => {
  test("header links reach cooperation and about", async ({ page, site }) => {
    await site.goto("/");

    await test.step("Go to cooperation", async () => {
      await site.desktopNav().getByRole("link", { name: "合作方式" }).click();
      await expect(page).toHaveURL("/cooperation");
      await expect(page.getByRole("heading", { level: 1, name: /先跑通一个场景/ })).toBeVisible();
    });

    await test.step("Go to about", async () => {
      await site.desktopNav().getByRole("link", { name: "关于我们" }).click();
      await expect(page).toHaveURL("/about");
      await expect(page.getByRole("heading", { level: 1, name: /AI 的价值/ })).toBeVisible();
    });
  });

  test("services dropdown opens both solution pages", async ({ page, site }) => {
    await site.goto("/");

    await test.step("Open content operations", async () => {
      await site.goToService(/自媒体运营/);
      await expect(page).toHaveURL("/services/content-operations");
      await expect(page.getByRole("heading", { level: 1, name: /把内容做出来/ })).toBeVisible();
    });

    await test.step("Open ecommerce marketing", async () => {
      await site.goToService(/电商营销/);
      await expect(page).toHaveURL("/services/ecommerce-marketing");
      await expect(page.getByRole("heading", { level: 1, name: /每一次营销/ })).toBeVisible();
    });
  });

  test("home and footer reach the services index", async ({ page, site }) => {
    await site.goto("/");
    await page.getByRole("link", { name: "查看服务方向" }).click();
    await expect(page).toHaveURL("/services");
    await expect(page.getByRole("heading", { level: 1, name: /AI 不该多一个入口/ })).toBeVisible();

    await site.footerNav().getByRole("link", { name: "服务方向" }).click();
    await expect(page).toHaveURL("/services");
  });
});
