import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // PDFエンドポイントの処理時間を計測
  if (request.nextUrl.pathname === '/api/generate-pdf') {
    const start = Date.now();
    const response = await NextResponse.next();
    const duration = Date.now() - start;

    // レスポンスヘッダーに処理時間を追加
    response.headers.set('X-Response-Time', `${duration}ms`);

    // 処理時間が長い場合はログを出力
    if (duration > 2000) {
      console.warn(`PDF生成に時間がかかっています: ${duration}ms`);
    }

    return response;
  }

  return NextResponse.next();
}