import { test, expect } from '@playwright/test';

test('基本テスト例', async ({ page }) => {
  await page.goto('/');
  
  // ここにE2Eテストを追加します
  // 例: タイトルの検証
  // await expect(page).toHaveTitle(/My App/);
});
