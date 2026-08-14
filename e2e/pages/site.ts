import { type Page } from "@playwright/test";

export class SitePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  desktopNav() {
    return this.page.getByRole("navigation", { name: "主导航" });
  }

  mobileNav() {
    return this.page.getByRole("navigation", { name: "移动端导航" });
  }

  footerNav() {
    return this.page.getByRole("navigation", { name: "页脚导航" });
  }

  async openServicesMenu() {
    await this.desktopNav().getByRole("button", { name: "服务方向" }).click();
  }

  async goToService(name: string) {
    await this.openServicesMenu();
    await this.page.getByRole("menuitem", { name }).click();
  }

  async openConsultFromHeader() {
    await this.page.getByRole("button", { name: "咨询合作" }).click();
  }

  async openMobileMenu() {
    await this.page.getByRole("button", { name: "打开导航" }).click();
  }
}
