import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  inventoryPrice: Locator;
  subTotal: Locator;
  tax: Locator;
  total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryPrice = page.locator(".inventory_item_price");
    this.subTotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
  }

  async getInventoryPrice() {
    const inventoryPrices = await this.inventoryPrice.allInnerTexts();

    return inventoryPrices
      .map((priceString) => priceString.replace("$", ""))
      .map(parseFloat)
      .reduce((sum, price) => sum + price, 0);
  }

  async getTax() {
    return await this.tax.textContent();
  }
}
