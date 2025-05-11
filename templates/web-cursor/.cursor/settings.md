# Cursor AI プロジェクト設定

## プロジェクト概要

Next.js + Honoを使用したフルスタックTypescriptアプリケーション。フロントエンドはReact、バックエンドAPIはHonoで実装しています。TailwindCSSでスタイリングを行い、Zodでバリデーションをしています。

## コーディング規約

### 命名規則
- コンポーネント: PascalCase (例: UserProfile)
- 関数/変数: camelCase (例: getUserData)
- 定数: ALL_CAPS (例: API_BASE_URL)
- プライベートメンバー: アンダースコアプレフィックス (例: _handleSubmit)

### 型安全性
- `strict: true`を有効にして厳格な型チェックを行う
- `any`型の使用は避ける
- インターフェースと型エイリアスを適切に使い分ける

### エラーハンドリング
- 非同期処理には必ずtry/catchブロックを使用する
- エラーメッセージには十分なコンテキスト情報を含める
- ユーザーには分かりやすいエラーメッセージを表示する

## ファイル構造

```
src/
├── app/               # Next.js App Router
├── components/        # 再利用可能なUIコンポーネント
├── lib/               # ユーティリティ関数
├── api/               # APIエンドポイント (Hono)
└── types/             # TypeScript型定義
```

## パッケージ管理

- パッケージマネージャにはpnpmを使用する
- パッケージ追加は `pnpm add` コマンドを使用する
- 開発用パッケージは `pnpm add -D` で追加する
