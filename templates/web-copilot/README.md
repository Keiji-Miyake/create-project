# Next.js + Hono アプリケーション (GitHub Copilot対応)

このプロジェクトは、[Next.js v15](https://nextjs.org/)と[Hono v4](https://hono.dev/)を使用したフルスタックTypeScriptアプリケーションのテンプレートです。GitHub Copilotによるコード補完と提案機能を最大限に活用するための設定が組み込まれており、効率的な開発体験を提供します。

## 主要機能

- **Next.js v15**: App Routerによる最新のReactフレームワーク
- **Hono v4**: 高速・軽量なWebフレームワークによるAPIルーティング
- **TypeScript**: 型安全性を確保した堅牢な開発環境
- **GitHub Copilot**: AIコード補完と提案機能を最適化する設定
- **テスト環境**: Vitest + Playwrightによる自動テスト
- **スタイリング**: Tailwind CSSによるモダンなUI構築
- **コード品質**: Biome + Huskyによる品質管理

## セットアップ手順

```bash
# 依存関係のインストール
pnpm install

# ※初回セットアップ時、package.jsonに "prepare": "husky install" が自動追加され、huskyが有効化されます
# もしフックが有効化されていない場合は、以下を手動実行してください
pnpm run prepare

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
├── biome.json             # Biome設定
```

## テスト・品質管理

このプロジェクトはVitest/Playwrightでテスト、Biomeで静的解析・フォーマットを行います。

```bash
# テストの実行
pnpm test

# E2Eテスト
pnpm test:e2e

# Lint（Biome）
pnpm lint

# フォーマット（Biome）
pnpm format
```

## Biomeの利用について

- 設定ファイルは `biome.json` です。
- 旧ESLint/Prettierは不要です。`pnpm lint`/`pnpm format`でBiomeが実行されます。
