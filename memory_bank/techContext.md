# 技術コンテキスト

## 開発環境

* OS: Linux 5.15
* エディタ: Visual Studio Code
* バージョン管理: Git
* シェル: /bin/zsh

---

### バージョン管理・運用ルール

* バージョニングは [Semantic Versioning](https://semver.org/lang/ja/)（MAJOR.MINOR.PATCH）に従う
* 本番リリース時は `main` ブランチからリリースし、タグ（例: v1.2.3）を付与
* 機能追加・修正は `feature/` または `fix/` プレフィックスのブランチで管理し、Pull Request経由で `main` にマージ
* npm公開前に `pnpm version` コマンドでバージョンを更新し、`CHANGELOG.md` を記載
* 公開後は `main` ブランチにタグをpushし、npm publishを実施
* 緊急修正は `hotfix/` ブランチで対応し、リリース後すぐにタグ付け・公開
* バージョンアップ・公開・運用ルールの変更は `memory_bank/activeContext.md` で管理・共有

---

### npm publish手順・注意事項

* 公開前に `pnpm test` で全テスト・CI/CDが通ることを確認
* `pnpm publish --dry-run` で公開内容・不要ファイル混入・エラーの有無を事前検証
* 問題なければ `pnpm publish` で本番公開
* 公開後は mainブランチにタグ（例: v1.2.3）をpush
* 機密情報や不要ファイル（.env等）が含まれていないか .npmignore や package.json の files 設定で必ず除外
* 公開前にREADMEやドキュメントの内容が最新か再確認
* 公開後はバージョン・タグ・CHANGELOGを必ず管理・共有

## 使用技術スタック

### 1. フレームワーク

* Next.js v15 (App Router)
* React
* React Native
* Hono v4

### 2. 言語・基盤

* TypeScript
* Node.js
* zod（バリデーション）

### 3. 開発ツール

* ESLint
* Prettier
* Jest
* Vitest
* TypeScript Compiler
* ts-node

## 品質管理

### 1. テスト

* ユニットテスト
* 統合テスト
* E2Eテスト

### 2. CI/CD

* 自動ビルド
* 自動テスト
* 自動デプロイ

## セキュリティ

* 依存関係の管理
* コード脆弱性スキャン
* セキュアなAPI設計

## パフォーマンス

* バンドルサイズの最適化
* キャッシング戦略
* 非同期処理の最適化
