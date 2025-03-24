# 技術コンテキスト

## 技術スタック

### フロントエンド

* Next.js v15.2.3
* React v18.2.0
* React DOM v18.2.0
* TypeScript v5.x

### PDF生成・操作

* @react-pdf/renderer v4.3.0
* Puppeteer v24.4.0

### クラウドサービス

* AWS SDK S3 Client v3.772.0

### スタイリング

* TailwindCSS v4.x
* PostCSS

## 開発環境

### 開発ツール

* Node.js
* TypeScript
* ESLint v9.x
* Next.js開発サーバー（Turbopack使用）

### パッケージ管理

* npm/pnpm
* 厳格なバージョン管理
* 定期的な依存関係の更新

### 型定義

* @types/node
* @types/react v19.x
* @types/react-dom v19.x
* 厳格な型チェック

## ビルドと実行

### スクリプト

* `npm run dev`: 開発サーバー起動（Turbopack）
* `npm run build`: プロダクションビルド
* `npm run start`: プロダクションサーバー起動
* `npm run lint`: コード品質チェック

### 環境変数

* NEXT_PUBLIC_AWS_S3_BUCKET
* その他AWS認証情報
* 開発/本番環境の設定

## 品質管理

### Linting

* ESLint
* Next.js推奨ルール
* TypeScript固有のルール

### 型チェック

* TypeScript Strict Mode
* 明示的な型定義
* 型推論の活用

### パフォーマンス

* Turbopack高速開発
* 最適化されたビルド
* 効率的なバンドル