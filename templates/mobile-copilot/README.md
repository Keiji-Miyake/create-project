# React Native アプリケーション (GitHub Copilot対応)

このプロジェクトは、[React Native](https://reactnative.dev/)を使用したモバイルアプリケーションのテンプレートです。GitHub Copilotによるコード補完と提案機能を活用して、効率的な開発を行うことができます。

## 機能

- React Nativeによるクロスプラットフォーム開発
- TypeScript完全対応
- React Navigation for アプリナビゲーション
- GitHub Copilotとの連携設定済み
- ESLint + Prettierによるコード品質管理

## セットアップ手順

```bash
# 依存関係のインストール
pnpm install

# iOSビルド用のCocoaPodsをインストール (macOSのみ)
pnpm pods

# 開発サーバーの起動
pnpm start

# 別のターミナルで、iOSシミュレータを起動
pnpm ios

# または、Androidエミュレータを起動
pnpm android
```

## プロジェクト構造

```
├── .github/               # GitHub関連設定
├── src/
│   ├── components/        # 再利用可能なコンポーネント
│   ├── screens/           # アプリケーション画面
│   ├── navigation/        # ナビゲーション設定
│   ├── hooks/             # カスタムフック
│   ├── services/          # APIサービス
│   ├── utils/             # ユーティリティ関数
│   ├── constants/         # 定数
│   └── types/             # TypeScriptの型定義
├── ios/                   # iOSプラットフォーム固有のコード
├── android/               # Androidプラットフォーム固有のコード
└── .eslintrc.js          # ESLint設定
```

## GitHub Copilotの活用方法

このテンプレートはGitHub Copilotとの連携を前提に設計されています。以下の方法で効率的に開発を進めることができます：

1. 新しいコンポーネントの作成時にはコメントで目的を記述するだけで、Copilotが実装を提案します
2. スタイリングの際も、目的を記述すれば適切なスタイルコードを生成します
3. 型定義も必要な項目をコメントするだけで、適切な構造を提案します

## デプロイ

アプリのリリースについては以下のドキュメントを参照してください：
- Android: [React Nativeアプリのリリース (Android)](https://reactnative.dev/docs/signed-apk-android)
- iOS: [React Nativeアプリのリリース (iOS)](https://reactnative.dev/docs/publishing-to-app-store)
