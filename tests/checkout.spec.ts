import test, { expect } from "@playwright/test";
import {
  FIRST_NAME,
  LAST_NAME,
  NUMBER_OF_PRODUCTS,
  PASSWORD,
  USERNAME,
  ZIP_CODE,
} from "@swagLabs/utils/data";
import { ShippingInfo } from "@swagLabs/pageObjects/shippingInfoPage";
import { CheckoutPage } from "@swagLabs/pageObjects/checkoutPage";
import { YourCart } from "@swagLabs/pageObjects/yourCartPage";
import { addToCart, loginAsUser } from "@swagLabs/utils/helpers";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await loginAsUser(page, USERNAME, PASSWORD);
  await addToCart(page, NUMBER_OF_PRODUCTS);
  const cart = new YourCart(page);
  await cart.checkout();
  const shippingInfo = new ShippingInfo(page);
  await shippingInfo.addInfo(FIRST_NAME, LAST_NAME, ZIP_CODE);
  await shippingInfo.continue();
});
test.describe("Checking Checkout page", () => {
  test("15. Correct total with multiple items including tax", async ({
    page,
  }) => {
    const checkout = new CheckoutPage(page);
    const sum = await checkout.getInventoryPrice();
    const textLocator = await checkout.getTax();
    const tax = parseFloat(textLocator.match(/\d+\.\d{2}/)[0]);

    await checkout.total.hover();
    await expect(checkout.subTotal).toContainText(`$${sum}`);
    await expect(checkout.total).toContainText(`$${sum + tax}`);
  });
});

test.afterEach(async ({ page }) => {
  console.log(
    `Finished ${test.info().title} with status ${test.info().status}`,
  );

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
