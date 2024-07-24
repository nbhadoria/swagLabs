import { Locator, Page } from "@playwright/test";
import { HOMEPAGE_URL } from "@swagLabs/utils/consts";

export class LoginPage {
  page: Page;
  username: Locator;
  password: Locator;
  loginButton: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async login(username: string, password: string) {
    await this.page.goto(HOMEPAGE_URL);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
