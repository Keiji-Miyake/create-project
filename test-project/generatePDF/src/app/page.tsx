import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">支払い管理システム</h1>
        <div className="space-y-4">
          <Link
            href="/payment-history"
            className="block w-full p-4 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            支払い履歴を表示
          </Link>
        </div>
      </div>
    </main>
  );
}
