import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { generateReceiptHTML, type ReceiptData } from '@/utils/receipt-template';

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const data: ReceiptData = await request.json();

    // HTMLを生成
    const html = generateReceiptHTML(data);

    // Puppeteerブラウザを起動
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
      // HTMLをセット
      await page.setContent(html, {
        waitUntil: 'networkidle0'
      });

      // PDFを生成
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      });

      // ブラウザを閉じる
      await browser.close();

      // PDFをレスポンスとして返却
      return new NextResponse(pdf, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=receipt-${data.invoiceNumber}.pdf`
        }
      });

    } catch (error) {
      await browser.close();
      throw error;
    }

  } catch (error) {
    console.error('PDF生成エラー:', error);
    return NextResponse.json(
      { 
        error: 'PDFの生成に失敗しました',
        details: error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}