'use client';

import { useState } from 'react';
import type { ReceiptData } from '@/utils/receipt-template';

const GenerateReceiptButton = ({ payment }: { payment: ReceiptData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setError(null);

      // APIを呼び出してPDFを生成
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        throw new Error('PDFの生成に失敗しました');
      }

      // PDFをダウンロード
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `領収書_${payment.invoiceNumber}_${payment.date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('PDF生成エラー:', err);
      const errorMessage = err instanceof Error ? err.message : '予期せぬエラーが発生しました';
      setError(`領収書の生成に失敗しました: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 relative">
          <p className="text-red-700 text-sm pr-8">{error}</p>
          <button
            onClick={() => setError(null)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            aria-label="エラーメッセージを閉じる"
          >
            ✕
          </button>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`
          w-full px-4 py-2 rounded transition-colors
          ${isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
        aria-busy={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            PDF生成中...
          </span>
        ) : (
          '領収書を発行'
        )}
      </button>
    </div>
  );
};

const PaymentCard = ({ payment }: { payment: ReceiptData }) => (
  <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="text-gray-600">日付:</div>
      <div>{payment.date}</div>
      <div className="text-gray-600">請求番号:</div>
      <div>{payment.invoiceNumber}</div>
      <div className="text-gray-600">金額:</div>
      <div>¥{payment.amount.toLocaleString()}</div>
      <div className="text-gray-600">支払方法:</div>
      <div>{payment.paymentMethod}</div>
    </div>
    <GenerateReceiptButton payment={payment} />
  </div>
);

export default function PaymentHistory() {
  const payments: ReceiptData[] = [
    {
      id: 1,
      date: '2025-03-24',
      invoiceNumber: 'INV-001',
      amount: 5000,
      paymentMethod: 'クレジットカード'
    },
    {
      id: 2,
      date: '2025-03-23',
      invoiceNumber: 'INV-002',
      amount: 3000,
      paymentMethod: '銀行振込'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">支払い履歴</h1>
      <div className="grid gap-4">
        {payments.map(payment => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}