import { test, expect } from '@playwright/test';
test('homepage exposes the portfolio thesis', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      name: /i build dependable products across software, native systems, and connected devices/i,
    }),
  ).toBeVisible();
});

test('homepage starts at the top after reload', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.reload();

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('project route renders Sepia', async ({ page }) => {
  await page.goto('/projects/sepia-client');
  await expect(
    page.getByRole('heading', { name: 'SEPIA', exact: true }),
  ).toBeVisible();
});
test('focused media dialog is labelled, dismissible, and restores focus', async ({
  page,
}) => {
  await page.goto('/projects/sepia-client');

  const trigger = page.getByRole('button', {
    name: 'Focus image: 02 / Reconfigure',
  });
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: '02 / Reconfigure' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleDescription(
    /same surface can hold changing arrangements/i,
  );

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
test('focused media dialog follows image proportions without viewport overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/projects/sepia-client');

  const mobileTrigger = page.getByRole('button', {
    name: 'Focus image: 06 / Focus',
  });
  await mobileTrigger.click();

  const mobileDialog = page.getByRole('dialog', { name: '06 / Focus' });
  const mobileImage = mobileDialog.locator('img');
  await expect(mobileDialog).toBeVisible();
  await expect(mobileImage).toBeVisible();

  const mobileMetrics = await mobileDialog.evaluate((dialog) => {
    const image = dialog.querySelector('img');
    const imageScroll = dialog.querySelector(
      '.sepia-media-dialog__image-scroll',
    );
    const dialogBox = dialog.getBoundingClientRect();
    const imageBox = image?.getBoundingClientRect();
    return {
      dialogWidth: dialogBox.width,
      dialogLeft: dialogBox.left,
      imageWidth: imageBox?.width ?? 0,
      imageHeight: imageBox?.height ?? 0,
      scrollWidth: dialog.scrollWidth,
      imageScrollHeight: imageScroll?.clientHeight ?? 0,
      imageScrollContentHeight: imageScroll?.scrollHeight ?? 0,
    };
  });

  expect(mobileMetrics.dialogWidth).toBeLessThanOrEqual(355.5);
  expect(mobileMetrics.dialogLeft).toBeGreaterThanOrEqual(9);
  expect(
    mobileMetrics.dialogWidth - mobileMetrics.dialogLeft,
  ).toBeGreaterThanOrEqual(9);
  expect(mobileMetrics.imageHeight / mobileMetrics.imageWidth).toBeCloseTo(
    1600 / 788,
    1,
  );
  expect(mobileMetrics.scrollWidth).toBeLessThanOrEqual(
    mobileMetrics.dialogWidth + 1,
  );
  expect(mobileMetrics.imageScrollContentHeight).toBeGreaterThan(
    mobileMetrics.imageScrollHeight,
  );

  await page.mouse.click(2, 2);
  await expect(mobileDialog).toBeHidden();
  await expect(mobileTrigger).toBeFocused();

  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopTrigger = page.getByRole('button', {
    name: 'Focus image: 01 / Compose',
  });
  await desktopTrigger.click();
  const desktopDialog = page.getByRole('dialog', { name: '01 / Compose' });
  await expect(desktopDialog).toBeVisible();

  const desktopMetrics = await desktopDialog.evaluate((dialog) => {
    const image = dialog.querySelector('img');
    const dialogBox = dialog.getBoundingClientRect();
    const imageBox = image?.getBoundingClientRect();
    return {
      dialogWidth: dialogBox.width,
      dialogLeft: dialogBox.left,
      imageWidth: imageBox?.width ?? 0,
      imageHeight: imageBox?.height ?? 0,
      viewportWidth: dialog.ownerDocument.defaultView?.innerWidth ?? 0,
      scrollWidth: dialog.scrollWidth,
    };
  });

  expect(desktopMetrics.dialogWidth).toBeLessThanOrEqual(1440);
  expect(
    Math.abs(
      desktopMetrics.dialogLeft -
        (desktopMetrics.viewportWidth - desktopMetrics.dialogWidth) / 2,
    ),
  ).toBeLessThan(2);
  expect(desktopMetrics.imageHeight / desktopMetrics.imageWidth).toBeCloseTo(
    982 / 1600,
    1,
  );
  expect(desktopMetrics.scrollWidth).toBeLessThanOrEqual(
    desktopMetrics.dialogWidth + 1,
  );
  await page.keyboard.press('Escape');
  await expect(desktopDialog).toBeHidden();
  await expect(desktopTrigger).toBeFocused();
});
test('generated dossier routes render content', async ({ page }) => {
  await page.goto('/capabilities/native-and-hardware-integration');
  await expect(
    page.getByRole('heading', { name: 'Native and Hardware Integration' }),
  ).toBeVisible();
  await expect(page.getByText(/Technical deep dive/i)).toBeVisible();
  await page.goto('/engineering-stories/hardware-communication-platform');
  await expect(
    page.getByRole('heading', { name: 'Hardware Communication Platform' }),
  ).toBeVisible();
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
  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });
  await expect(navigation).toBeVisible();

  await page.getByRole('link', { name: 'Projects', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Open navigation' }),
  ).toBeFocused();
});
