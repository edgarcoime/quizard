import { test, expect } from "@playwright/test";
import { MAIN_URL, TEST_USER } from "./constants";

test("redirect unauthorized user from Collection create form", async ({
  page,
}) => {
  const target = `${MAIN_URL}/id/${TEST_USER.username}/new`;
  const _response = await page.goto(target);

  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);
});

//test("has title", async ({ page }) => {
//  await page.goto("https://playwright.dev/");
//
//  // Expect a title "to contain" a substring.
//  await expect(page).toHaveTitle(/Playwright/);
//});
//
//test("get started link", async ({ page }) => {
//  await page.goto("https://playwright.dev/");
//
//  // Click the get started link.
//  await page.getByRole("link", { name: "Get started" }).click();
//
//  // Expects page to have a heading with the name of Installation.
//  await expect(
//    page.getByRole("heading", { name: "Installation" }),
//  ).toBeVisible();
//});
