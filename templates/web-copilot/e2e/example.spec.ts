import { test, expect } from '@playwright/test';

test('ホームページが正しく表示される', async ({ page }) => {
  // トップページに移動
  await page.goto('/');
  
  // ページタイトルの確認
  await expect(page).toHaveTitle(/Next.js \+ Hono/);
  
  // 必須要素が存在するか確認
  await expect(page.getByRole('heading', { name: /Welcome/i })).toBeVisible();
});

test('デモページに移動し、デモコンポーネントが表示される', async ({ page }) => {
  // デモページに移動
  await page.goto('/demo');
  
  // デモページの要素確認
  await expect(page.getByRole('heading', { name: /Demo/i })).toBeVisible();
  
  // コンポーネントの操作例
  const button = page.getByRole('button', { name: /Click me/i });
  await expect(button).toBeVisible();
  
  // ボタンクリックのインタラクション
  await button.click();
  
  // 状態変化の確認
  // 注: 実際のアプリケーションに合わせて適切なアサーションに変更してください
  // await expect(page.getByText(/Thanks for clicking/i)).toBeVisible();
});
