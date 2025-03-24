import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// S3クライアントの設定
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// PDFをS3にアップロードする関数
export async function uploadPDFToS3(
  pdfBlob: Blob,
  fileName: string,
  bucketName: string
): Promise<string> {
  try {
    const buffer = await pdfBlob.arrayBuffer();
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `receipts/${fileName}`,
      Body: Buffer.from(buffer),
      ContentType: 'application/pdf',
    });

    await s3Client.send(command);
    
    // S3のURLを返す
    return `https://${bucketName}.s3.amazonaws.com/receipts/${fileName}`;
  } catch (error) {
    console.error('S3アップロードエラー:', error);
    throw new Error('PDFのアップロードに失敗しました');
  }
}