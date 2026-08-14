import { consultDraft, test, expect } from "./fixtures/consult";

test.describe("consult dialog", () => {
  test("submits in private preview when no company mailbox is bound", async ({ site, consult }) => {
    await site.goto("/");

    await test.step("Open from header and fill the form", async () => {
      await site.openConsultFromHeader();
      await expect(consult.root()).toBeVisible();
      await consult.fill(consultDraft);
    });

    await test.step("Submit stays local", async () => {
      await consult.submit();
      await expect(consult.feedback()).toHaveText(/当前为私密预览/);
      await expect(consult.feedback()).toHaveText(/你的信息没有被发送/);
    });
  });

  test("closes from the header button and Escape", async ({ page, site, consult }) => {
    await site.goto("/");
    await site.openConsultFromHeader();
    await expect(consult.root()).toBeVisible();

    await consult.close();
    await expect(consult.root()).toBeHidden();

    await page.getByRole("button", { name: "发起合作咨询" }).click();
    await expect(consult.root()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(consult.root()).toBeHidden();
  });

  test("required fields block submit", async ({ site, consult }) => {
    await site.goto("/");
    await site.openConsultFromHeader();
    await consult.submit();

    await expect(consult.root()).toBeVisible();
    await expect(consult.feedback()).toHaveCount(0);
    await expect(consult.root().getByLabel("怎么称呼")).toBeFocused();
  });

  test("closing the dialog clears previous feedback", async ({ site, consult }) => {
    await site.goto("/");
    await site.openConsultFromHeader();
    await consult.fill(consultDraft);
    await consult.submit();
    await expect(consult.feedback()).toBeVisible();

    await consult.close();
    await site.openConsultFromHeader();
    await expect(consult.feedback()).toHaveCount(0);
  });
});
