// filepath: templates/web-copilot/.github/instructions/general-coding.instructions.md
---
applyTo: "**"
---
# Web Copilot Coding Standards

## 技術スタック
- Next.js（App Router推奨）
- React（関数コンポーネント/フック）
- TypeScript（strict: true必須）
- Hono（APIルーティング/サーバーサイド）
- Cloudflare Workers（デプロイ先）
- Tailwind CSS
- Playwright, Vitest（テスト）
- pnpm（パッケージ管理）

## 命名規則
- コンポーネント/型/インターフェース: PascalCase
- 変数/関数/メソッド: camelCase
- プライベートメンバ: _（アンダースコア）で始める
- 定数: ALL_CAPS

## エラーハンドリング
- 非同期処理はtry/catch必須
- API/サーバーサイドはHonoのエラーハンドラを活用
- エラーは必ずコンテキスト情報付きでログ出力

## パッケージ管理
- pnpmのみ利用
- 依存追加・インストールはpnpmコマンド限定

## テスト
- ユニットテスト: Vitest
- E2Eテスト: Playwright
- テストカバレッジ目標: ユニット80%以上、統合70%以上
- Jestは禁止

## Cloudflare Workers
- wranglerでデプロイ
- HonoのCloudflare対応ミドルウェアを利用

## その他
- TypeScript strict: true必須
- any禁止、zodでバリデーション
- SOLID/DRY/KISS原則
- 静的解析・Lint必須
