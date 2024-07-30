import { test, expect } from '@playwright/test';

test.describe('svelte-a11y-headline-auto-level', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test');
  });

  test('basic usage', async ({ page }) => {
    const basicUsage = page.getByTestId('basic-usage');
    await expect(basicUsage.locator('#basic-h1')).toHaveAttribute('aria-level', '1');
    await expect(basicUsage.locator('#basic-h2')).toHaveAttribute('aria-level', '2');
    await expect(basicUsage.locator('#basic-h2-2')).toHaveAttribute('aria-level', '2');
  });

  test('custom tags', async ({ page }) => {
    const customTags = page.getByTestId('custom-tags');
    await expect(customTags.locator('article')).toBeVisible();
    await expect(customTags.locator('aside')).toBeVisible();
    await expect(customTags.locator('#custom-h1')).toHaveAttribute('aria-level', '1');
    await expect(customTags.locator('#custom-h2')).toHaveAttribute('aria-level', '2');
  });

  test('custom levels', async ({ page }) => {
    const customLevels = page.getByTestId('custom-levels');
    await expect(customLevels.locator('#custom-level-h2')).toHaveAttribute('aria-level', '2');
    await expect(customLevels.locator('#custom-level-h3')).toHaveAttribute('aria-level', '3');
    await expect(customLevels.locator('#custom-level-h1')).toHaveAttribute('aria-level', '1');
  });

  test('relative levels', async ({ page }) => {
    const relativeLevels = page.getByTestId('relative-levels');
    await expect(relativeLevels.locator('#relative-h4')).toHaveAttribute('aria-level', '4');
    await expect(relativeLevels.locator('#relative-h5')).toHaveAttribute('aria-level', '5');
    await expect(relativeLevels.locator('#relative-h3')).toHaveAttribute('aria-level', '3');
  });

  test('deep nesting', async ({ page }) => {
    const deepNesting = page.getByTestId('deep-nesting');
    await expect(deepNesting.locator('#deep-h1')).toHaveAttribute('aria-level', '1');
    await expect(deepNesting.locator('#deep-h2')).toHaveAttribute('aria-level', '2');
    await expect(deepNesting.locator('#deep-h3')).toHaveAttribute('aria-level', '3');
    await expect(deepNesting.locator('#deep-h4')).toHaveAttribute('aria-level', '4');
    await expect(deepNesting.locator('#deep-h5')).toHaveAttribute('aria-level', '5');
    await expect(deepNesting.locator('#deep-h6')).toHaveAttribute('aria-level', '6');
    await expect(deepNesting.locator('#deep-h6-2')).toHaveAttribute('aria-level', '6');
  });

  test('nested component', async ({ page }) => {
    const nestedComponent = page.getByTestId('nested-component');
    await expect(nestedComponent.locator('#parent-h1')).toHaveAttribute('aria-level', '1');
    await expect(nestedComponent.locator('#nested-h2')).toHaveAttribute('aria-level', '2');
    await expect(nestedComponent.locator('#nested-h3')).toHaveAttribute('aria-level', '3');
  });
});