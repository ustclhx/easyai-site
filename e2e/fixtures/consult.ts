import { test as base } from "@playwright/test";
import { ConsultDialog } from "../pages/consult-dialog";
import { SitePage } from "../pages/site";

export type ConsultDraft = {
  name: string;
  company: string;
  contact: string;
  service: string;
  message: string;
};

type ConsultFixtures = {
  site: SitePage;
  consult: ConsultDialog;
};

export const consultDraft: ConsultDraft = {
  name: "测试用户",
  company: "五人内容团队",
  contact: "13800138000",
  service: "电商营销",
  message: "每周要发 20 条内容，评论和私信经常漏回。",
};

export const test = base.extend<ConsultFixtures>({
  site: async ({ page }, use) => {
    await use(new SitePage(page));
  },
  consult: async ({ page }, use) => {
    await use(new ConsultDialog(page));
  },
});

export { expect } from "@playwright/test";
