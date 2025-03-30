import { ReactElement } from 'react';
import { pdf, Document as PDFDocument } from '@react-pdf/renderer';

interface PDFGenerationResult {
  blob: Blob;
  downloadUrl: string;
  s3Url?: string;
  metadata?: PDFMetadata;
}

interface PDFMetadata {
  fileName: string;
  createdAt: string;
  fileSize: number;
  uploadStatus: 'local' | 'uploaded' | 'failed';
}

// PDFドキュメントのプロパティ型を定義
type PDFDocumentProps = React.ComponentProps<typeof PDFDocument>;
type PDFElement = ReactElement<PDFDocumentProps, typeof PDFDocument>;

// PDFメタデータの作成
function createPDFMetadata(
  fileName: string,
  blob: Blob,
  uploadStatus: 'local' | 'uploaded' | 'failed'
): PDFMetadata {
  return {
    fileName,
    createdAt: new Date().toISOString(),
    fileSize: blob.size,
    uploadStatus,
  };
}

export async function generateAndUploadPDF(
  document: PDFElement,
  fileName: string,
  uploadToS3: boolean = true
): Promise<PDFGenerationResult> {
  try {
    // PDF生成
    console.log('PDF生成開始:', fileName);
    const blob = await pdf(document).toBlob();
    console.log('PDF生成完了:', fileName);

    // ダウンロード用URL作成
    const downloadUrl = URL.createObjectURL(blob);

    if (!uploadToS3) {
      const metadata = createPDFMetadata(fileName, blob, 'local');
      return { blob, downloadUrl, metadata };
    }

    // S3にアップロード
    try {
      console.log('S3アップロード開始:', fileName);
      const { uploadPDFToS3 } = await import('./s3-client');
      const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET || '';
      const s3Url = await uploadPDFToS3(blob, fileName, bucketName);
      console.log('S3アップロード完了:', s3Url);
      const metadata = createPDFMetadata(fileName, blob, 'uploaded');
      return { blob, downloadUrl, s3Url, metadata };
    } catch (uploadError) {
      console.warn('S3アップロード失敗:', uploadError);
      // S3アップロードが失敗しても、ローカルダウンロードは可能にする
      const metadata = createPDFMetadata(fileName, blob, 'failed');
      return { blob, downloadUrl, metadata };
    }
  } catch (error) {
    console.error('PDF処理エラー:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'PDFの生成中にエラーが発生しました'
    );
  }
}

export function triggerDownload(url: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function cleanupDownloadUrl(url: string): void {
  URL.revokeObjectURL(url);
}

// PDFドキュメントの型チェック関数
export function isPDFElement(element: ReactElement): element is PDFElement {
  return element.type === PDFDocument;
}

/**
 * PDFのメタデータを文字列として整形
 * @param metadata PDFメタデータ
 * @returns 整形されたメタデータ文字列
 */
export function formatPDFMetadata(metadata: PDFMetadata): string {
  const fileSizeInMB = (metadata.fileSize / (1024 * 1024)).toFixed(2);
  const created = new Date(metadata.createdAt).toLocaleString('ja-JP');

  return `ファイル名: ${metadata.fileName}
作成日時: ${created}
ファイルサイズ: ${fileSizeInMB}MB
アップロード状態: ${
    metadata.uploadStatus === 'uploaded'
      ? '完了'
      : metadata.uploadStatus === 'failed'
        ? '失敗'
        : 'ローカルのみ'
  }`;
}
