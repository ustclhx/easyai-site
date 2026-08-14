import { test, expect } from "./fixtures/consult";

test.describe("homepage", () => {
  test("shows the hero and primary actions", async ({ page, site }) => {
    await test.step("Open home", async () => {
      await site.goto("/");
    });

    await expect(page).toHaveTitle(/easyai/);
    await expect(page.getByRole("heading", { level: 1, name: /让小团队/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "聊聊你的场景" })).toBeVisible();
    await expect(page.getByRole("link", { name: "查看服务方向" })).toBeVisible();
  });

  test("marks the growth chart as illustrative", async ({ page, site }) => {
    await site.goto("/");

    await expect(page.getByText("示意数据 · 非效果承诺")).toBeVisible();
    await expect(page.getByRole("img", { name: "六周稳定触达趋势示意图" })).toBeVisible();
    await expect(page.getByText(/示意数据从第 1 周的 28 增长到第 6 周的 108/)).toBeAttached();
  });

  test("skip link jumps to main content", async ({ page, site }) => {
    await site.goto("/");

    const skip = page.getByRole("link", { name: "跳到主要内容" });
    await skip.focus();
    await expect(skip).toBeVisible();
    await skip.click();

    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
