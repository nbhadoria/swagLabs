import { Page } from "@playwright/test";
import { LoginPage } from "@swagLabs/pageObjects/loginPage";
import { ProductsPage } from "@swagLabs/pageObjects/productsPage";

export async function loginAsUser(
  page: Page,
  username: string,
  password: string,
) {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
}

export async function addToCart(page: Page, numberOfProducts: number) {
  const products = new ProductsPage(page);
  await products.addProducts(numberOfProducts);
  await products.gotoShoppingCart();
}
