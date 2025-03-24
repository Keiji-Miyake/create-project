# PDF領収書生成システム

Next.jsで構築された領収書PDF生成システムです。APIエンドポイントを通じて領収書データを受け取り、PDFを生成してS3にアップロードする機能を提供します。

## 主な機能

- 領収書PDFの動的生成
- AWS S3への自動アップロード
- カスタマイズ可能なPDFテンプレート
- Next.js APIルートを使用したRESTful API

## 必要な環境変数

プロジェクトを実行するには、以下の環境変数を`.env.local`ファイルに設定する必要があります：

```bash
# AWS S3の設定
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=ap-northeast-1  # または他の適切なリージョン
```

## Getting Started

まず、開発サーバーを起動します：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

[http://localhost:3000](http://localhost:3000)をブラウザで開いて結果を確認できます。

## API使用方法

領収書PDFを生成するには、以下のエンドポイントにPOSTリクエストを送信します：

```bash
POST /api/generate-pdf
```

リクエストボディの例：

```json
{
  "id": 1,
  "date": "2024-03-24",
  "invoiceNumber": "INV-2024-001",
  "amount": 5000,
  "paymentMethod": "クレジットカード"
}
```

## PDFテンプレートのカスタマイズ

PDFのテンプレートは`src/utils/receipt-template.ts`で定義されています。HTMLとCSSを編集することで、領収書のデザインをカスタマイズできます。

## Learn More

Next.jsについての詳細は以下のリソースをご覧ください：

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsの機能とAPIについて
- [Learn Next.js](https://nextjs.org/learn) - Next.jsの対話型チュートリアル

## Deploy on Vercel

Next.jsアプリを最も簡単にデプロイする方法は、[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細は[Next.jsのデプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご確認ください。
