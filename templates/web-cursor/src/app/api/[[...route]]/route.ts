// src/app/api/[[...route]]/route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Honoアプリケーションの作成
const app = new Hono().basePath('/api');

// 簡単なGETエンドポイント
app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono v4!',
    timestamp: new Date().toISOString(),
  });
});

// POSTリクエストの例（zodによるバリデーション付き）
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().optional(),
});

app.post('/user', zValidator('json', userSchema), async (c) => {
  try {
    const user = c.req.valid('json');
    // 実際のアプリケーションではここでデータベースに保存など
    return c.json({
      success: true,
      user,
      message: 'User created successfully',
    }, 201);
  } catch (error) {
    // エラーログとコンテキスト情報の記録
    console.error('Error creating user:', error);
    return c.json({
      success: false,
      message: 'Failed to create user',
    }, 500);
  }
});

// Vercel向けハンドラーのエクスポート
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
