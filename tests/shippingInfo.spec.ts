import test, { expect } from "@playwright/test";
import { ShippingInfo } from "@swagLabs/pageObjects/shippingInfoPage";
import { YourCart } from "@swagLabs/pageObjects/yourCartPage";
import {
  FIRST_NAME,
  LAST_NAME,
  NUMBER_OF_PRODUCTS,
  PASSWORD,
  USERNAME,
  ZIP_CODE,
} from "@swagLabs/utils/data";
import { addToCart, loginAsUser } from "@swagLabs/utils/helpers";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await loginAsUser(page, USERNAME, PASSWORD);
  await addToCart(page, NUMBER_OF_PRODUCTS);
  const cart = new YourCart(page);
  await cart.checkout();
});
test.describe("Checking Shipping Information page", () => {
  test("11. Shipping information", async ({ page }) => {
    const cart = new YourCart(page);
    const shippingInfo = new ShippingInfo(page);
    await shippingInfo.addInfo(FIRST_NAME, LAST_NAME, ZIP_CODE);
    await shippingInfo.continue();
    await expect(shippingInfo.subHeader).toContainText("Checkout: Overview");
  });

  test("12. First name is empty for shipping information", async ({ page }) => {
    const shippingInfo = new ShippingInfo(page);
    await shippingInfo.addInfo("", LAST_NAME, ZIP_CODE);
    await shippingInfo.continue();
    await expect(shippingInfo.errorMessage).toContainText(
      "First Name is required",
    );
  });

  test("13. Last name is empty for shipping information", async ({ page }) => {
    const shippingInfo = new ShippingInfo(page);
    await shippingInfo.addInfo(FIRST_NAME, "", ZIP_CODE);
    await shippingInfo.continue();
    await expect(shippingInfo.errorMessage).toContainText(
      "Last Name is required",
    );
  });

  test("14. Postal code is empty for shipping information", async ({
    page,
  }) => {
    const shippingInfo = new ShippingInfo(page);
    await shippingInfo.addInfo(FIRST_NAME, LAST_NAME, "");
    await shippingInfo.continue();
    await expect(shippingInfo.errorMessage).toContainText(
      "Postal Code is required",
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
