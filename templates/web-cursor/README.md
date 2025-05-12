# Next.js + Hono アプリケーション (GitHub Copilot対応)

このプロジェクトは、[Next.js](https://nextjs.org/)と[Hono](https://hono.dev/)を使用したフルスタックウェブアプリケーションのテンプレートです。GitHub Copilotによるコード補完と提案機能を活用して、効率的な開発を行うことができます。

## 機能

- Next.jsによるReactフロントエンド
- HonoによるAPIルーティング
- TypeScript完全対応
- GitHub Copilotとの連携設定済み
- ESLint + Prettierによるコード品質管理

## セットアップ手順

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて、アプリケーションを確認できます。

## プロジェクト構造

```text
├── .github/               # GitHub関連設定
├── src/
│   ├── app/               # App Router コンポーネント
│   ├── components/        # 再利用可能なコンポーネント
│   ├── lib/               # ユーティリティ関数
│   ├── api/               # API Routes (Honoで実装)
│   └── types/             # TypeScriptの型定義
├── public/                # 静的ファイル
└── .eslintrc.json        # ESLint設定
```

## テスト環境

このプロジェクトはVitestを使用してテストを行います。現在の設定では以下のテスト方針を採用しています：

```bash
# テストの実行
pnpm test
```

### テスト設定の詳細

- テストファイルは `.test.ts` または `.spec.ts` 拡張子で作成します
- JSX/TSXを含むReactコンポーネントのテストは現在一時的に除外されています
  - 今後対応予定のため、`.test.tsx` ファイルは保持しておいてください
- テストの環境設定は `src/test/setup.ts` で管理しています

## GitHub Copilotの活用方法

このテンプレートはGitHub Copilotとの連携を前提に設計されています。以下の方法で効率的に開発を進めることができます：

1. 新しいコンポーネントの作成時にはコメントで目的を記述するだけで、Copilotが実装を提案します
2. API関数の実装時にも関数名と引数を定義すれば、処理の大部分を自動生成できます
3. 型定義も必要な項目をコメントするだけで、適切な構造を提案します

## デプロイ

このアプリケーションは様々なプラットフォームにデプロイできますが、特に[Vercel](https://vercel.com/)との相性が良いです。
