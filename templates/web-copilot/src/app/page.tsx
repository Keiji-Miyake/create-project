// src/app/page.tsx
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="flex flex-col items-center justify-center max-w-5xl w-full">
        <h1 className="text-6xl font-bold text-center mb-8">
          Next.js + Hono アプリケーション
        </h1>
        <p className="text-xl text-center mb-8">
          GitHub Copilotを活用したフルスタック開発をはじめましょう
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-8 mb-8">
          <Link href="/demo" className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            コンポーネントデモ
          </Link>
          <Link href="/api/hello" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            APIを試す
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="https://nextjs.org/docs" className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900">
            Next.jsドキュメント
          </Link>
          <Link href="https://hono.dev" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
            Honoドキュメント
          </Link>
        </div>
      </div>
    </main>
  );
}
