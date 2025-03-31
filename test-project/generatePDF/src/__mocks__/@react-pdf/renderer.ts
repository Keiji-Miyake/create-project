// src/__mocks__/@react-pdf/renderer.ts
import React from 'react';

// Document コンポーネントの基本的なモック
export const Document = ({ children }: { children: React.ReactNode }) => React.createElement('DocumentMock', null, children);

// pdf 関数のモック
export const pdf = (document: React.ReactElement) => ({
  toBlob: jest.fn().mockResolvedValue(new Blob(['mock pdf content'], { type: 'application/pdf' })),
  toBuffer: jest.fn().mockResolvedValue(Buffer.from('mock pdf content')),
  toString: jest.fn().mockReturnValue('mock pdf string'),
  // 他に必要なメソッドがあれば追加
});

// 他の必要なエクスポートがあればここに追加
export const Page = ({ children }: { children: React.ReactNode }) => React.createElement('PageMock', null, children);
export const View = ({ children }: { children: React.ReactNode }) => React.createElement('ViewMock', null, children);
export const Text = ({ children }: { children: React.ReactNode }) => React.createElement('TextMock', null, children);
// ... Font, StyleSheet など、必要に応じて他のコンポーネントやAPIをモック