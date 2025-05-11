// src/screens/DetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// サンプルデータ
const DETAILS = {
  1: {
    title: 'はじめてのReact Native',
    content: `
      React Nativeは、Facebookが開発したオープンソースのモバイルアプリケーションフレームワークです。
      JavaScriptとReactを使用して、ネイティブのモバイルアプリケーションを構築することができます。
      一度書いたコードで、iOSとAndroid両方のプラットフォームに対応できるのが大きな特徴です。
      
      主な特徴:
      - クロスプラットフォーム開発
      - ホットリロード機能
      - ネイティブUIコンポーネント
      - 豊富なサードパーティライブラリ
      - Reactと同じ設計原則
    `
  },
  2: {
    title: 'コンポーネント設計',
    content: `
      React Nativeでのコンポーネント設計は、アプリケーションの保守性と再利用性に大きく影響します。
      
      良いコンポーネント設計のポイント:
      - 単一責任の原則を守る
      - 柔軟性のあるプロップスを設計する
      - 適切なステート管理を行う
      - メモ化でパフォーマンスを最適化する
      - テスト可能な構造を維持する
    `
  },
  3: {
    title: 'ナビゲーションの実装',
    content: `
      React Navigationはアプリ内での画面遷移を管理するためのライブラリです。
      
      ナビゲーションの種類:
      - Stack Navigation: 画面を積み重ねるように管理
      - Tab Navigation: タブで複数の画面を切り替え
      - Drawer Navigation: サイドメニューで画面を管理
      - Modal Navigation: モーダル表示の画面遷移
      
      パラメータ渡しやナビゲーションライフサイクルイベントの活用が重要です。
    `
  },
  4: {
    title: 'APIとの連携',
    content: `
      モバイルアプリはバックエンドサービスと連携することが多いです。
      
      API連携の基本:
      - fetch APIやAxiosを使ったHTTPリクエスト
      - 非同期処理とエラーハンドリング
      - データキャッシュとリフレッシュ戦略
      - オフラインサポート
      - セキュリティ対策（認証トークンなど）
    `
  },
  5: {
    title: 'スタイリングのコツ',
    content: `
      React NativeのスタイリングはCSSに似ていますが、いくつかの違いがあります。
      
      スタイリングのポイント:
      - StyleSheetを使用してスタイルを定義する
      - フレックスボックスレイアウトの活用
      - プラットフォーム固有のスタイルの適用方法
      - テーマと動的スタイリング
      - スタイルのパフォーマンス最適化
    `
  }
};

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { id } = route.params;
  const [detail, setDetail] = useState({ title: '', content: '' });

  useEffect(() => {
    // 実際のアプリではAPIからデータを取得する処理になる
    if (DETAILS[id as keyof typeof DETAILS]) {
      setDetail(DETAILS[id as keyof typeof DETAILS]);
    }
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{detail.title}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{detail.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailScreen;
