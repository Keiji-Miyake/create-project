// filepath: templates/mobile-copilot/.github/instructions/general-coding.instructions.md
---
applyTo: "**"
---
# Mobile Copilot Coding Standards

## 技術スタック
- React Native（Expo/CLIどちらも可）
- TypeScript（strict: true必須）
- Jest（テスト: React Nativeのみ許容）
- pnpm（パッケージ管理）

## 命名規則
- コンポーネント/型/インターフェース: PascalCase
- 変数/関数/メソッド: camelCase
- プライベートメンバ: _（アンダースコア）で始める
- 定数: ALL_CAPS

## エラーハンドリング
- 非同期処理はtry/catch必須
- 画面単位でErrorBoundaryを設置
- エラーは必ずコンテキスト情報付きでログ出力

## パッケージ管理
- pnpmのみ利用
- 依存追加・インストールはpnpmコマンド限定

## テスト
- ユニットテスト: Jest
- E2Eテスト: Detox（必要に応じて）
- テストカバレッジ目標: ユニット80%以上、統合70%以上
- Vitest/Playwrightは利用しない

## その他
- TypeScript strict: true必須
- any禁止、zodでバリデーション
- SOLID/DRY/KISS原則
- 静的解析・Lint必須
- Expo/CLIどちらでも動作する設計を推奨
