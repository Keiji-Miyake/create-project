// src/app/demo/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Form } from '@/components/Form';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function DemoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 入力時にエラーをクリア
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = '名前を入力してください';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // APIエンドポイントへのリクエストをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitResult({
        success: true,
        message: 'フォームが正常に送信されました！',
      });
      
      // フォームをリセット
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'エラーが発生しました。後でもう一度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Demo</h1>
      <button>Click me</button>
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
          ← ホームに戻る
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">コンポーネントデモ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">フォームコンポーネント</h2>
            <Card 
              title="お問い合わせフォーム" 
              description="以下のフォームに必要事項を入力してください"
            >
              {submitResult && (
                <div className={`p-4 mb-4 rounded-md ${submitResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitResult.message}
                </div>
              )}
              
              <Form onSubmit={handleSubmit} isSubmitting={isSubmitting} showReset>
                <TextField
                  label="お名前"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                  error={errors.name}
                  required
                />
                
                <TextField
                  label="メールアドレス"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  error={errors.email}
                  required
                />
                
                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    メッセージ<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="お問い合わせ内容をご記入ください"
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
              </Form>
            </Card>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">ボタンバリエーション</h2>
            <Card title="ボタンサンプル">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>プライマリ</Button>
                  <Button variant="secondary">セカンダリ</Button>
                  <Button variant="danger">危険</Button>
                  <Button variant="ghost">ゴースト</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">小</Button>
                  <Button>中</Button>
                  <Button size="lg">大</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button isLoading>ローディング</Button>
                  <Button disabled>無効</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
