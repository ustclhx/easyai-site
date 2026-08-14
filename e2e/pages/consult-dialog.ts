import { type Page } from "@playwright/test";
import type { ConsultDraft } from "../fixtures/consult";

export class ConsultDialog {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  root() {
    return this.page.getByRole("dialog", { name: "说说你现在卡在哪里" });
  }

  feedback() {
    return this.root().getByRole("status");
  }

  async fill(draft: ConsultDraft) {
    const dialog = this.root();
    await dialog.getByLabel("怎么称呼").fill(draft.name);
    await dialog.getByLabel("公司 / 团队").fill(draft.company);
    await dialog.getByLabel("联系方式").fill(draft.contact);
    await dialog.getByLabel("关注方向").selectOption(draft.service);
    await dialog.getByLabel("想解决的问题").fill(draft.message);
  }

  async submit() {
    await this.root().getByRole("button", { name: "提交咨询" }).click();
  }

  async close() {
    await this.root().getByRole("button", { name: "关闭咨询表单" }).click();
  }
}
