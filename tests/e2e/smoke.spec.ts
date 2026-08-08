import { test, expect } from '@playwright/test';
test('homepage exposes the portfolio thesis', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /software at the boundary between product interfaces/i })).toBeVisible();
});
test('project route renders Sepia', async ({ page }) => {
  await page.goto('/projects/sepia-client');
  await expect(
    page.getByRole('heading', { name: 'SEPIA', exact: true }),
  ).toBeVisible();
});
test('generated dossier routes render content', async ({ page }) => {
  await page.goto('/capabilities/native-and-hardware-integration');
  await expect(page.getByRole('heading', { name: 'Native and Hardware Integration' })).toBeVisible();
  await expect(page.getByText(/Technical deep dive/i)).toBeVisible();
  await page.goto('/engineering-stories/hardware-communication-platform');
  await expect(page.getByRole('heading', { name: 'Hardware Communication Platform' })).toBeVisible();
});
test('not found route renders', async ({ page }) => {
  await page.goto('/missing-page');
  await expect(
    page.getByRole('heading', { name: /route does not exist/i }),
  ).toBeVisible();
});

test('mobile navigation is keyboard accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Open navigation' });
  await menuButton.click();
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(navigation).toBeVisible();

  await page.getByRole('link', { name: 'Projects', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
});
