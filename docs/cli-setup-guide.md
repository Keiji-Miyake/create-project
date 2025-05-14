# AI-Toolbox CLIのローカル環境セットアップガイド

## 概要

AI-Toolboxプロジェクトで開発されたCLIツール（`km-create-project`）をローカル環境で使用するための設定手順をまとめています。このガイドに従うことで、プロジェクトテンプレートを簡単に作成するためのコマンドラインツールをローカル環境で利用できるようになります。

## 前提条件

- Node.js がインストールされていること
- pnpm がインストールされていること
- TypeScriptの開発環境が整っていること

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
cd /path/to/ai-toolbox
pnpm install
```

### 2. プロジェクトをビルド

```bash
pnpm build
```

### 3. バイナリファイルに実行権限を付与

```bash
chmod +x dist/bin/index.js
```

### 4. pnpmのグローバル環境設定（初回のみ）

```bash
pnpm setup
source ~/.zshrc  # または ~/.bashrc など、使用しているシェルの設定ファイル
```

### 5. シンボリックリンクの作成

```bash
mkdir -p "$PNPM_HOME"
ln -sf "$(pwd)/dist/bin/index.js" "$PNPM_HOME/km-create-project"
```

## 使用方法

### 新しいプロジェクトの作成

```bash
km-create-project <プロジェクト名>
```

### ヘルプの表示

```bash
km-create-project --help
```

## 使用例

```bash
# 新しいWebプロジェクトを作成
km-create-project my-web-app

# プロジェクトディレクトリに移動
cd my-web-app

# 依存パッケージをインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

## 注意点

- 現時点では、ウェブベースのプロジェクト（Next.js）とGitHub Copilotの組み合わせのみがサポートされています
- プロジェクトのパッケージマネージャーとして`pnpm`を使用することが推奨されています
- 将来のバージョンでは、他のスタックやAIツールのサポートも追加される予定です

## トラブルシューティング

### コマンドが見つからない場合

`km-create-project`コマンドが見つからないというエラーが表示される場合は、以下を確認してください：

1. `$PNPM_HOME`がPATHに正しく設定されていることを確認
   ```bash
   echo $PNPM_HOME
   echo $PATH | grep -o "$PNPM_HOME"
   ```

2. シンボリックリンクが正しく作成されていることを確認
   ```bash
   ls -la "$PNPM_HOME/km-create-project"
   ```

3. 必要に応じて再度リンクを作成
   ```bash
   ln -sf "/path/to/ai-toolbox/dist/bin/index.js" "$PNPM_HOME/km-create-project"
   ```

---

*このドキュメントは、AI-Toolboxプロジェクトのローカル開発環境でのCLIセットアップ手順を記録したものです。プロジェクトの成長に伴い、更新されることがあります。*
