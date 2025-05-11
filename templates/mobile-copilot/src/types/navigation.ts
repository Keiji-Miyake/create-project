// src/types/navigation.ts

/**
 * ナビゲーションの型定義
 */

export type RootStackParamList = {
  Main: undefined;
  Detail: { id: number; title: string };
};

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};
