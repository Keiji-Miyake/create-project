// src/screens/HomeScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';

type ItemType = {
  id: number;
  title: string;
  description: string;
};

// サンプルデータ
const DATA: ItemType[] = [
  { id: 1, title: 'はじめてのReact Native', description: 'React Nativeの基本を学びます' },
  { id: 2, title: 'コンポーネント設計', description: '再利用可能なコンポーネントの作り方' },
  { id: 3, title: 'ナビゲーションの実装', description: '画面遷移の方法について' },
  { id: 4, title: 'APIとの連携', description: 'バックエンドサービスとの連携方法' },
  { id: 5, title: 'スタイリングのコツ', description: '効率的なスタイル適用の方法' },
];

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items] = useState<ItemType[]>(DATA);

  const handleItemPress = useCallback((item: ItemType) => {
    navigation.navigate('Detail', { id: item.id, title: item.title });
  }, [navigation]);

  const renderItem = ({ item }: { item: ItemType }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native アプリ</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default HomeScreen;
