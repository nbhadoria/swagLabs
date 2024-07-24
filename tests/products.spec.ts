import { expect, test } from "@playwright/test";
import { NUMBER_OF_PRODUCTS, PASSWORD, USERNAME } from "@swagLabs/utils/data";
import { loginAsUser } from "@swagLabs/utils/helpers";
import { ProductsPage } from "@swagLabs/pageObjects/productsPage";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await loginAsUser(page, USERNAME, PASSWORD);
});

test.describe("Checking Product page", () => {
  test("6. Sort item from lowest to highest price", async ({ page }) => {
    const products = new ProductsPage(page);
    await products.dropdown.selectOption("lohi");
    await expect(products.dropdown).toContainText("Price (low to high)");
  });

  test("7. Add 3 items to the cart", async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProducts(NUMBER_OF_PRODUCTS);
    await expect(products.productCartItemsCount).toContainText(
      `${NUMBER_OF_PRODUCTS}`,
    );
  });

  test("8. Removing item", async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProducts(NUMBER_OF_PRODUCTS);
    await expect(products.productCartItemsCount).toContainText(
      `${NUMBER_OF_PRODUCTS}`,
    );
    await products.removeItem();
    await expect(products.productCartItemsCount).toContainText(
      `${NUMBER_OF_PRODUCTS - 1}`,
    );
  });
});

test.afterEach(async ({ page }) => {
  console.log(
    `Finished ${test.info().title} with status ${test.info().status}`,
  );

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
