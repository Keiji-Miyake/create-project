# React Native アプリケーション (GitHub Copilot対応)

このプロジェクトは、[React Native](https://reactnative.dev/) を用いたクロスプラットフォームモバイルアプリのテンプレートです。GitHub CopilotによるAIコード補完・提案機能を最大限活用できるよう設計されています。

## 主な機能・技術スタック

- **React Native**: クロスプラットフォームアプリ開発
- **TypeScript**: 型安全な開発
- **React Navigation**: アプリナビゲーション
- **Jest**: ユニットテスト（※React NativeテンプレートのみJest利用を許容）
- **ESLint + Prettier**: コード品質管理
- **zod**: バリデーション

## セットアップ手順

```bash
# 依存関係のインストール
pnpm install

# iOSビルド用CocoaPodsのインストール (macOSのみ)
pnpm pods

# 開発サーバの起動
pnpm start

# iOSシミュレータ起動
pnpm ios
# または Androidエミュレータ起動
pnpm android
```

## テスト・品質管理

- **テストフレームワーク:** Jest（Web系テンプレートではVitest/Playwrightのみ許容、Jestは禁止）
- **テスト実行:** `pnpm test` / `pnpm test:watch`
- **型チェック:** `pnpm type-check`
- **Lint:** `pnpm lint`
- **フォーマット:** `pnpm format`
- **一括チェック:** `pnpm check`

## ディレクトリ構成例

```text
├── .github/               # GitHub関連設定
├── src/
│   ├── components/        # 再利用可能なコンポーネント
│   ├── screens/           # アプリ画面
│   ├── navigation/        # ナビゲーション設定
│   ├── hooks/             # カスタムフック
│   ├── services/          # APIサービス
│   ├── utils/             # ユーティリティ関数
│   ├── constants/         # 定数
│   └── types/             # 型定義
├── ios/                   # iOS固有コード
├── android/               # Android固有コード
└── .eslintrc.js           # ESLint設定
```

## GitHub Copilot活用法

- 新しいコンポーネントや関数作成時はコメントで目的を記述し、Copilotの提案を活用
- 型定義やテストもコメント記述で効率化
- Copilotの提案は必ずレビューし、型安全性・可読性を担保

## デプロイ・リリース参考

- Android: [React Nativeアプリのリリース (Android)](https://reactnative.dev/docs/signed-apk-android)
- iOS: [React Nativeアプリのリリース (iOS)](https://reactnative.dev/docs/publishing-to-app-store)
