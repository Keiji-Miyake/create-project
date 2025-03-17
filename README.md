# AI-Toolbox

AI支援によるコード生成のための最適化されたボイラープレートプロジェクトです。

## 概要

このプロジェクトは、AI（人工知能）によるコード生成の品質、効率、および速度を向上させることを目的としたボイラープレートです。Cline、Cursor などのAIコード生成ツールの設定ファイルを一元管理し、最適な開発環境を提供します。

## 特徴

- 📝 最適化されたAI prompting設定
- 🚀 効率的なコード生成ワークフロー
- 🔧 カスタマイズ可能なAIルール
- 🎯 プロジェクト固有の制約設定
- 🔍 インテリジェントなファイル除外設定

## プロジェクト構造

```
.
├── .clinerules        # Clineのグローバルルール設定
├── .clineignore       # Cline用の除外ファイル設定
├── .roomodes          # Clineのカスタムモード定義
├── .gitignore         # Git用の除外ファイル設定
└── cline/
    └── custom-instructions.md  # カスタム指示設定
```

## 使用方法

1. このリポジトリをクローン:
```bash
git clone https://github.com/yourusername/ai-toolbox.git
cd ai-toolbox
```

2. 必要に応じて設定ファイルをカスタマイズ:
   - `.clinerules`: AIの動作ルールを定義
   - `.clineignore`: 解析から除外するファイルを指定
   - `.roomodes`: カスタムモードの定義を設定

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

AIの動作ルールを定義します。以下は設定例です：

```json
{
  "rules": {
    "codeStyle": "standard",
    "maxLineLength": 80,
    "preferredLanguage": "typescript"
  }
}
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