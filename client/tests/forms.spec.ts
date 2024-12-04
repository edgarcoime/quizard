import { test, expect } from "@playwright/test";
import { MAIN_URL, TEST_USER, TEST_COLLECTION, TEST_CARD } from "./constants";

test("redirect unauthorized user from Collection create form", async ({
  page,
}) => {
  const targetUrl = `${MAIN_URL}/id/${TEST_USER.username}/new`;
  const _response = await page.goto(targetUrl);

  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);
});

test("redirect unauthorized user from Collection editing form", async ({
  page,
}) => {
  const targetUrl = `${MAIN_URL}/id/${TEST_USER.username}/${TEST_COLLECTION.slug}/settings`;
  const _response = await page.goto(targetUrl);

  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);
});

test("redirect unauthorized user from Card create form", async ({ page }) => {
  const targetUrl = `${MAIN_URL}/id/${TEST_USER.username}/${TEST_COLLECTION.slug}/new`;
  const _response = await page.goto(targetUrl);

  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);
});

test("redirect unauthorized user from Card editing form", async ({ page }) => {
  const targetUrl = `${MAIN_URL}/id/${TEST_USER.username}/${TEST_COLLECTION.slug}/${TEST_CARD.id}/settings`;
  const _response = await page.goto(targetUrl);

  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);
});
