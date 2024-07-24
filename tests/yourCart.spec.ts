import { expect, test } from "@playwright/test";
import { NUMBER_OF_PRODUCTS, PASSWORD, USERNAME } from "@swagLabs/utils/data";
import { loginAsUser, addToCart } from "@swagLabs/utils/helpers";
import { YourCart } from "@swagLabs/pageObjects/yourCartPage";
import { ShippingInfo } from "@swagLabs/pageObjects/shippingInfoPage";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await loginAsUser(page, USERNAME, PASSWORD);
  await addToCart(page, NUMBER_OF_PRODUCTS);
});

test.describe("Checking Your Cart page", () => {
  test("9. Removing item from my basket", async ({ page }) => {
    const cart = new YourCart(page);
    await cart.cartContents.waitFor();
    const numberOfItem = (await cart.cartItems.count()).valueOf();
    await cart.removeItem();
    await expect(cart.cartItems).toHaveCount(numberOfItem - 1);
  });

  test("10. Checkout", async ({ page }) => {
    const cart = new YourCart(page);
    const shippingInfo = new ShippingInfo(page);
    await cart.checkout();
    await expect(shippingInfo.subHeader).toContainText(
      "Checkout: Your Information",
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
