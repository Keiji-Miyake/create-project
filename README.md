# AI-Toolbox

AI支援によるコード生成のための最適化されたボイラープレートプロジェクトです。

## 概要

このプロジェクトは、AI（人工知能）によるコード生成の品質、効率、および速度を向上させることを目的としたボイラープレートです。GitHub Copilot、Cline、Cursor などのAIコード生成ツールの設定ファイルを一元管理し、最適な開発環境を提供します。

## create-project CLI

AI開発に最適化されたプロジェクトテンプレートを簡単に生成するCLIツールを提供しています。

### 機能

- Next.js + Honoベースのウェブアプリテンプレート生成
- React Nativeベースのモバイルアプリテンプレート生成
- 各種AIコーディングエージェント（GitHub Copilot、Cline、Cursor）対応のテンプレート

### 使用方法

```bash
# コマンドラインから実行
npx create-project myapp
```

対話式のプロンプトで以下を入力するだけです：

1. プロジェクト名（コマンドライン引数がない場合）

現在のバージョン（v1.0.0）では、Next.js + HonoベースのWebアプリ + GitHub Copilot向けのテンプレートのみ対応しています。将来のバージョンでは以下のオプションが追加される予定です：

- 技術スタック（Webアプリ／モバイルアプリ）
- AIコーディングエージェント（GitHub Copilot／Cline／Cursor）

※パッケージマネージャーは pnpm を使用してください

※パッケージマネージャーは pnpm を使用してください

## 特徴

- 📝 最適化されたAI prompting設定
- 🚀 効率的なコード生成ワークフロー
- 🔧 カスタマイズ可能なAIルール
- 🎯 プロジェクト固有の制約設定
- 🔍 インテリジェントなファイル除外設定

## プロジェクト構造

```tree
.
├── .clinerules        # Clineのグローバルルール設定
├── .clineignore       # Cline用の除外ファイル設定
├── .github            # GitHub用の設定ディレクトリ
   ├── instructions
   ├── prompts
   └── copilot-instructions.md

```

## 使用方法

1. このリポジトリをクローン:
```bash
git clone https://github.com/yourusername/ai-toolbox.git
cd ai-toolbox
```

## 開発ワークフロー

### コミットルール

1. タスク完了時の確認事項:
   - 実装した機能が正常に動作するか確認
   - コードスタイルが一貫しているか確認
   - 設定ファイルの変更が意図通りか確認

2. コミットのタイミング:
   - 1つのタスクが完了し、動作確認が済んだ後
   - 設定ファイルの重要な変更後
   - 大きな機能追加や変更の区切り時

3. コミットメッセージの規則:
   ```
   feat: 新機能の追加
   fix: バグ修正
   docs: ドキュメントの更新
   style: フォーマットの変更
   refactor: リファクタリング
   test: テストの追加・修正
   chore: その他の変更
   ```

## カスタマイズ

### .clinerules

AIの動作ルールを定義します。Markdown形式で記述され、以下のようなセクションを含みます：

```markdown
# Modern TypeScript Development Guidelines

## 設計原則
- SOLID原則の遵守
- クリーンアーキテクチャの採用
- 型安全性の重視

## 開発プロセス
- コードレビューの実施
- テストの自動化
- 継続的インテグレーション

## 主要なセクション
- 基本設定 (00_base.md)
- 開発プロセス (05_process.md)
- プロジェクト規約
- モードごとの動作ルール
```

### .roomodes

カスタムモードを定義して、特定のタスクに特化したAIの動作を設定できます：

```json
{
  "customModes": [
    {
      "slug": "architect",
      "name": "Architect",
      "roleDefinition": "システム設計に特化したモード",
      "groups": ["read", "edit"]
    }
  ]
}
```

## ライセンス

MIT

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing_feature`)
3. 変更をコミット (`git commit -am 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing_feature`)
5. プルリクエストを作成

## お問い合わせ

質問や提案がありましたら、Issueを作成してください。
