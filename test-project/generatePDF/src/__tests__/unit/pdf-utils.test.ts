import {
  createPDFMetadata,
  formatPDFMetadata,
  triggerDownload,
  cleanupDownloadUrl,
  isPDFElement, // 追加
} from '@/utils/pdf-utils';
import type { PDFMetadata } from '@/utils/pdf-utils';
import React from 'react'; // React をインポート
import { Document as PDFDocumentMock } from '@react-pdf/renderer'; // モックをインポート

describe('pdf-utils', () => {
  describe('createPDFMetadata', () => {
    it('should create PDF metadata correctly for local status', () => {
      const fileName = 'test.pdf';
      const blob = new Blob(['test content'], { type: 'application/pdf' });
      const uploadStatus = 'local';

      const metadata = createPDFMetadata(fileName, blob, uploadStatus);

      expect(metadata.fileName).toBe(fileName);
      expect(metadata.fileSize).toBe(blob.size);
      expect(metadata.uploadStatus).toBe(uploadStatus);
      expect(metadata.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/); // ISO 8601 形式チェック
    });

    it('should create PDF metadata correctly for uploaded status', () => {
      const fileName = 'uploaded.pdf';
      const blob = new Blob(['more test content'], { type: 'application/pdf' });
      const uploadStatus = 'uploaded';

      const metadata = createPDFMetadata(fileName, blob, uploadStatus);

      expect(metadata.fileName).toBe(fileName);
      expect(metadata.fileSize).toBe(blob.size);
      expect(metadata.uploadStatus).toBe(uploadStatus);
      expect(metadata.createdAt).toBeDefined();
    });

    it('should create PDF metadata correctly for failed status', () => {
      const fileName = 'failed.pdf';
      const blob = new Blob([''], { type: 'application/pdf' }); // 空のBlob
      const uploadStatus = 'failed';

      const metadata = createPDFMetadata(fileName, blob, uploadStatus);

      expect(metadata.fileName).toBe(fileName);
      expect(metadata.fileSize).toBe(0);
      expect(metadata.uploadStatus).toBe(uploadStatus);
      expect(metadata.createdAt).toBeDefined();
    });
  });

  describe('formatPDFMetadata', () => {
    const baseMetadata: Omit<PDFMetadata, 'uploadStatus'> = {
      fileName: 'report.pdf',
      createdAt: '2024-03-31T10:20:30.000Z', // 固定の日付を使用
      fileSize: 1024 * 1024 * 1.5, // 1.5MB
    };

    // Date.toLocaleString のモック (テスト環境での一貫性を保つため)
    let dateSpy: jest.SpyInstance;
    beforeAll(() => {
      // spyOn を使用して toLocaleString をモック
      dateSpy = jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(function(
        this: Date, // this の型を明示
        locales?: unknown, // 型を unknown に変更
        options?: Intl.DateTimeFormatOptions
      ) {
        // 'ja-JP' ロケールの場合のみ固定値を返す
        if (locales === 'ja-JP') { // 文字列リテラルとの比較は可能
          // this を使って呼び出し元の Date インスタンスにアクセスできる
          // 必要であれば this の値に基づいて異なるフォーマットを返すことも可能
          // ここでは固定の文字列を返す
          return '2024/3/31 19:20:30';
        }
        // それ以外のロケールでは元の実装を呼び出すのは難しいため、代替値を返す
        // 元の実装を安全に呼び出すには、spyする前に関数を退避させる必要がある
        // このテストでは 'ja-JP' 以外は重要ではないため、ISO 文字列を返す
        return this.toISOString();
      });
    });

    afterAll(() => {
      // モックを元に戻す
      dateSpy.mockRestore();
    });

    it('should format metadata correctly for uploaded status', () => {
      const metadata: PDFMetadata = { ...baseMetadata, uploadStatus: 'uploaded' };
      const expectedOutput = `ファイル名: report.pdf
作成日時: 2024/3/31 19:20:30
ファイルサイズ: 1.50MB
アップロード状態: 完了`;
      expect(formatPDFMetadata(metadata)).toBe(expectedOutput);
    });

    it('should format metadata correctly for failed status', () => {
      const metadata: PDFMetadata = { ...baseMetadata, uploadStatus: 'failed' };
      const expectedOutput = `ファイル名: report.pdf
作成日時: 2024/3/31 19:20:30
ファイルサイズ: 1.50MB
アップロード状態: 失敗`;
      expect(formatPDFMetadata(metadata)).toBe(expectedOutput);
    });

    it('should format metadata correctly for local status', () => {
      const metadata: PDFMetadata = { ...baseMetadata, uploadStatus: 'local' };
      const expectedOutput = `ファイル名: report.pdf
作成日時: 2024/3/31 19:20:30
ファイルサイズ: 1.50MB
アップロード状態: ローカルのみ`;
      expect(formatPDFMetadata(metadata)).toBe(expectedOutput);
    });

    it('should format file size correctly for smaller files', () => {
      const metadata: PDFMetadata = {
        ...baseMetadata,
        fileSize: 512 * 1024, // 0.5MB
        uploadStatus: 'local',
      };
      expect(formatPDFMetadata(metadata)).toContain('ファイルサイズ: 0.50MB');
    });

    it('should format file size correctly for zero size files', () => {
      const metadata: PDFMetadata = {
        ...baseMetadata,
        fileSize: 0,
        uploadStatus: 'failed',
      };
      expect(formatPDFMetadata(metadata)).toContain('ファイルサイズ: 0.00MB');
    });
  });

  describe('triggerDownload', () => {
    // DOM操作のスパイ
    let appendChildSpy: jest.SpyInstance;
    let removeChildSpy: jest.SpyInstance;
    let clickSpy: jest.SpyInstance;

    beforeEach(() => {
      // 各テストの前にスパイを設定・リセット
      appendChildSpy = jest.spyOn(document.body, 'appendChild');
      removeChildSpy = jest.spyOn(document.body, 'removeChild');
      // createElement はスパイせず、実際の要素を作成する
      // click メソッドをスパイするために、一時的にプロトタイプを拡張
      clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {}); // 何もしないようにモック
    });

    afterEach(() => {
      // 各テスト後にスパイを元に戻す
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
      clickSpy.mockRestore();
    });

    it('should create a link, set attributes, append, click, and remove it', () => {
      const url = 'blob:http://localhost/mock-url';
      const fileName = 'download.pdf';

      triggerDownload(url, fileName);

      // appendChild が呼び出されたか、引数（リンク要素）を検証
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      const appendedLink = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement; // 渡された要素を取得
      expect(appendedLink).toBeInstanceOf(HTMLAnchorElement);
      expect(appendedLink.href).toBe(url); // href は blob URL そのものになる
      expect(appendedLink.download).toBe(fileName);

      // click が呼び出されたか
      expect(clickSpy).toHaveBeenCalledTimes(1);

      // removeChild が呼び出されたか、引数（同じリンク要素）を検証
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(removeChildSpy).toHaveBeenCalledWith(appendedLink);
    });
  });

  describe('cleanupDownloadUrl', () => {
    // window.URL.revokeObjectURL のモック
    let revokeObjectURLSpy: jest.SpyInstance;

    beforeAll(() => {
      // JSDOM環境で revokeObjectURL が存在するか確認し、なければダミー関数を設定
      if (typeof window.URL.revokeObjectURL === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.URL.revokeObjectURL = jest.fn(() => {});
      }
      revokeObjectURLSpy = jest.spyOn(window.URL, 'revokeObjectURL');
    });

    beforeEach(() => {
      revokeObjectURLSpy.mockClear();
    });

    afterAll(() => {
      revokeObjectURLSpy.mockRestore();
    });

    it('should call window.URL.revokeObjectURL with the correct url', () => {
      const url = 'blob:http://localhost/another-mock-url';
      cleanupDownloadUrl(url);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith(url);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isPDFElement', () => {
    it('should return true for a PDF Document element', () => {
      // モックされた Document コンポーネントを使用
      const pdfElement = React.createElement(PDFDocumentMock, null, 'Test');
      expect(isPDFElement(pdfElement)).toBe(true);
    });

    it('should return false for a standard HTML element', () => {
      const divElement = React.createElement('div', null, 'Test');
      expect(isPDFElement(divElement)).toBe(false);
    });

    it('should return false for a different React component', () => {
      const CustomComponent = () => React.createElement('span', null, 'Custom');
      const customElement = React.createElement(CustomComponent);
      expect(isPDFElement(customElement)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input types
      expect(isPDFElement(null as any)).toBe(false);
      // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input types
      expect(isPDFElement(undefined as any)).toBe(false);
    });

    it('should return false for a primitive value', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input types
      expect(isPDFElement('string' as any)).toBe(false);
      // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input types
      expect(isPDFElement(123 as any)).toBe(false);
    });
  });

  // generateAndUploadPDF のテストはここに追加
});