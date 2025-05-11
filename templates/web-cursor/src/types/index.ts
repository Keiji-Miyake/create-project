// src/types/index.ts

/**
 * 共通の型定義
 */

// ユーザー情報の型
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}

// APIレスポンスの型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// ページネーションの型
export interface PaginationParams {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
