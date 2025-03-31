import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('基本的なナビゲーション', async ({ page }) => {
    // ホームページにアクセス
    await page.goto('/');

    // ホームページのスクリーンショットを撮影
    await page.screenshot({ path: 'test-results/home-page.png' });

    // タイトルが表示されていることを確認
    const heading = page.getByRole('heading', { name: '支払い管理システム' });
    await expect(heading).toBeVisible();

    // 支払い履歴リンクが存在することを確認
    const historyLink = page.getByRole('link', { name: '支払い履歴を表示' });
    await expect(historyLink).toBeVisible();

    // リンクをクリックして支払い履歴ページに遷移
    await historyLink.click();

    // URLが/payment-historyに変更されていることを確認
    await expect(page).toHaveURL('/payment-history');

    // 支払い履歴ページのタイトルが表示されていることを確認
    const historyHeading = page.getByRole('heading', { name: '支払い履歴' });
    await expect(historyHeading).toBeVisible();
  });
});

test.describe('支払い履歴ページ', () => {
  test('支払い情報の表示', async ({ page }) => {
    // 支払い履歴ページに直接アクセス
    await page.goto('/payment-history');

    // 支払い履歴ページのスクリーンショットを撮影
    await page.screenshot({ path: 'test-results/payment-history.png', fullPage: true });

    // 2件の支払い情報が表示されていることを確認
    const paymentCards = page.locator('.border.p-4.rounded-lg');
    await expect(paymentCards).toHaveCount(2);

    // 最初の支払い情報の内容を確認
    const firstPayment = paymentCards.first();
    await expect(firstPayment.getByText('2025-03-24')).toBeVisible();
    await expect(firstPayment.getByText('INV-001')).toBeVisible();
    await expect(firstPayment.getByText('¥5,000')).toBeVisible();
    await expect(firstPayment.getByText('クレジットカード')).toBeVisible();

    // PDFの生成ボタンが各支払い情報に存在することを確認
    const generateButtons = page.getByRole('button', { name: '領収書を発行' });
    await expect(generateButtons).toHaveCount(2);
  });

  test('PDFの生成', async ({ page }) => {
    // 支払い履歴ページにアクセス
    await page.goto('/payment-history');

    // 最初のPDF生成ボタンをクリック
    const generateButton = page.getByRole('button', { name: '領収書を発行' }).first();
    
    // PDFのダウンロードをトリガーするので、このアクションを待機
    const downloadPromise = page.waitForEvent('download');
    await generateButton.click();

    // ボタンがローディング状態になることを確認
    await expect(page.getByText('PDF生成中...')).toBeVisible();

    // ローディング状態のスクリーンショットを撮影
    await page.screenshot({ path: 'test-results/pdf-generating.png' });

    // ダウンロードの完了を待機
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/領収書_INV-001_2025-03-24\.pdf/);
  });

  test('PDFの生成エラー処理', async ({ page }) => {
    // APIをモックしてエラーを返すように設定
    await page.route('/api/generate-pdf', async (route) => {
      await route.fulfill({
        status: 500,
        body: 'Internal Server Error',
      });
    });

    // 支払い履歴ページにアクセス
    await page.goto('/payment-history');

    // PDFの生成ボタンをクリック
    await page.getByRole('button', { name: '領収書を発行' }).first().click();

    // エラーメッセージが表示されることを確認
    await expect(page.getByText('領収書の生成に失敗しました')).toBeVisible();

    // エラー表示状態のスクリーンショットを撮影
    await page.screenshot({ path: 'test-results/pdf-error.png' });

    // エラーメッセージを閉じるボタンをクリック
    await page.getByRole('button', { name: 'エラーメッセージを閉じる' }).click();

    // エラーメッセージが非表示になることを確認
    await expect(page.getByText('領収書の生成に失敗しました')).not.toBeVisible();
  });
});