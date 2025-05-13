---
applyTo: "**"
---

# General Coding Instructions

## 基本コーディング指針

### 開発の基本原則

- TypeScriptの型安全性を最優先し、`strict: true`を必ず有効にする
- SOLID／DRY／KISS原則を遵守しつつ、個人が扱いやすいシンプルな設計を心がける
- `any`型の使用を避け、zodでバリデーションとエラー処理を明確にする

### 品質管理プロセス

- ESLint・Prettierで静的解析を行い、コード品質と可読性を維持
- テストピラミッドを意識し、ユニットテスト(80%以上)→統合テスト(70%以上)→E2E(主要フロー)の順で品質保証
- 個人開発でもPull Request形式でブランチ管理し、変更履歴を把握する

## メモリコンテキスト管理

- プロジェクトのコンテキストを `memory_bank/` のMarkdownファイルで管理する
- 作業前に必ず `activeContext.md` を読み、現在の開発トピックを把握する
- 大きな変更後は関連ファイルを更新して最新情報を反映する

## Memory Bank 構造

- 命名規則・エラー処理・パッケージ管理はルートの general-coding.instructions.md に準拠
- テストはVitest/Playwrightのみ利用可能（Jest禁止）
- テスト記述・実行はVitest/Playwrightに統一すること
