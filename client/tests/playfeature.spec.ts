import { test, expect } from '@playwright/test';
import { MAIN_URL, TEST_USER } from "./constants";

test('redirect unauthorized user trying to access play feature to sign up', async ({ page }) => {
  const targetUrl = `${MAIN_URL}/id/${TEST_USER.username}/software-engineering/play`;
  const response = await page.goto(targetUrl);
  
  const expectedUrl = `${MAIN_URL}/signup`;
  await expect(page).toHaveURL(expectedUrl);

  // Expect welcome back heading to be displayed.
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();

  // Expect studying paragraph to be displayed.
  await expect(page.getByText("Let's get studying again!")).toBeVisible();

  // Expect google login button to be displayed.
  await expect(page.getByRole('button', { name: 'Login with google' })).toBeVisible();

  // Locate the only button on the page
  const button = page.locator('button');
  // Check that an SVG is inside the button
  await expect(button.locator('svg')).toBeVisible();
});
