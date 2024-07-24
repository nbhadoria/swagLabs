import { Locator, Page } from "@playwright/test";

export class YourCart {
  page: Page;
  cartItems: Locator;
  removeButton: Locator;
  checkoutButton: Locator;
  cartContents: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.removeButton = page.locator(".item_pricebar button");
    this.checkoutButton = page.locator(".checkout_button");
    this.cartContents = page.locator("#cart_contents_container");
  }

  async removeItem() {
    await this.removeButton.first().click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
