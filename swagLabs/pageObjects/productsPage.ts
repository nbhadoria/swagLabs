import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  page: Page;
  dropdown: Locator;
  addToCartButton: Locator;
  shoppingCart: Locator;
  productCartItemsCount: Locator;
  removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator(".product_sort_container");
    this.addToCartButton = page.locator(".btn_primary");
    this.shoppingCart = page.locator("#shopping_cart_container");
    this.productCartItemsCount = page.locator("a span");
    this.removeButton = page.locator(".btn_secondary ");
  }

  async addProducts(numberOfProduct: number) {
    for (let i = 0; i < numberOfProduct; i++) {
      await this.addToCartButton.nth(i).click();
    }
  }

  async gotoShoppingCart() {
    await this.shoppingCart.click();
  }

  async removeItem() {
    await this.removeButton.first().click();
  }
}
