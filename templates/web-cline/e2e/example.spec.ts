import { test, expect } from '@playwright/test';

test('ホームページの基本要素が表示される', async ({ page }) => {
  // トップページに移動
  await page.goto('/');
  
  // ページタイトルの確認
  await expect(page).toHaveTitle(/Next.js App/);
  
  // 主要要素の確認
  await expect(page.getByRole('heading', { name: /Welcome/i })).toBeVisible();
});

test('ナビゲーションが正常に機能する', async ({ page }) => {
  // トップページに移動
  await page.goto('/');
  
  // 別ページへのリンクをクリック
  const aboutLink = page.getByRole('link', { name: /about/i });
  
  // リンクが存在する場合はクリックして移動を確認
  if (await aboutLink.isVisible()) {
    await aboutLink.click();
    await expect(page.url()).toContain('/about');
  }
});
