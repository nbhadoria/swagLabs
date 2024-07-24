import { Locator, Page } from "@playwright/test";

export class ShippingInfo {
  page: Page;
  subHeader: Locator;
  firstName: Locator;
  lastName: Locator;
  zipCode: Locator;
  continueButton: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subHeader = page.locator(".subheader");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.zipCode = page.locator("#postal-code");
    this.continueButton = page.locator("[value='CONTINUE']");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async addInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}
