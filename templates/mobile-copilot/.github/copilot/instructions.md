# GitHub Copilotによるコード生成のためのインストラクション

このファイルは、GitHub Copilotがこのプロジェクトのコードを生成する際に使用する指針です。

## プロジェクト概要

React Nativeで構築されたクロスプラットフォームモバイルアプリケーション。
TypeScriptを使用し、React Navigationによる画面遷移を実装しています。

## 命名規則

- コンポーネント: PascalCase (例: UserProfileCard)
- 関数/変数: camelCase (例: getUserData)
- 定数: SNAKE_CASE (例: API_BASE_URL)
- プライベートメンバー: アンダースコアプレフィックス (例: _handleSubmit)

## コーディングスタイル

- 関数コンポーネントとReact Hooksの使用を優先
- コンポーネントのスタイルはStyleSheetを使用
- 非同期処理にはasync/awaitを使用
- エラーハンドリングはtry/catchブロックで実装

## モバイル固有のガイドライン

- プラットフォーム固有のAPIにはPlatform.select()またはプラットフォーム固有のファイル命名規則を使用
- パフォーマンス最適化のためmemo、useCallback、useMemoを適切に使用
- ユーザー体験を妨げないようにメインスレッドでの重い処理を避ける

## エラーハンドリング

- APIレスポンスには常にtry/catchブロックを使用
- エラーメッセージには十分なコンテキスト情報を含める
- ユーザーフレンドリーなエラーメッセージを表示

## パッケージ管理

- 依存関係の追加には`pnpm add`を使用
- 開発依存関係は`pnpm add -D`で追加

## テスト

- コンポーネントテストは@testing-library/react-nativeを使用
- ユニットテストはJestで実装

## セキュリティプラクティス

- クライアント側での機密情報の保存を避ける
- APIキーなどの秘密情報は環境変数またはネイティブのセキュアストレージを使用
- 入力バリデーションにはZodを使用
