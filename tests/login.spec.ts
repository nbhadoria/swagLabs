import { test, expect } from "@playwright/test";
import { LoginPage } from "@swagLabs/pageObjects/loginPage";
import { INVENTORY_URL } from "@swagLabs/utils/consts";
import { LOCKED_USER, PASSWORD, USERNAME } from "@swagLabs/utils/data";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
});

test.describe("Checking Login page", () => {
  test("1. Successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(page.locator(".product_label")).toHaveText("Products");
  });

  test("2. locked out user and checking error message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(LOCKED_USER, PASSWORD);
    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out.",
    );
  });

  test("3. Login with incorrect password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, "PASSWORD");
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });

  test("4. Login with credentials which are upper case", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME.toUpperCase(), PASSWORD);
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match any user in this service",
    );
  });

  test("5. Login with empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("", PASSWORD);
    await expect(loginPage.errorMessage).toContainText("Username is required");
  });
});

test.afterEach(async ({ page }) => {
  console.log(
    `Finished ${test.info().title} with status ${test.info().status}`,
  );

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
