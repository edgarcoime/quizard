import { test, expect } from '@playwright/test';

test('redirect unauthorized user trying to access play feature to sign up', async ({ page }) => {
  const response = await page.goto('https://quizard.reotamai.me/id/cherry_apricot/software-engineering/play');
  
  const current_url = page.url();
  await expect(current_url).toBe("https://quizard.reotamai.me/signup");

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