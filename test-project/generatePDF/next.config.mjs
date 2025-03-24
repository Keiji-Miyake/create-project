/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // PDFレンダリングのための設定
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };

    // Node.js関連のポリフィル
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      stream: false,
      path: false,
      process: false,
    };

    // PDFフォントのローダー設定
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },
  // 環境変数の設定
  env: {
    AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
  }
};

export default nextConfig;