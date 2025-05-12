import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// コンポーネントテスト後に自動クリーンアップを実行
afterEach(() => {
  cleanup();
});

// 必要に応じてグローバルモックやセットアップを追加
