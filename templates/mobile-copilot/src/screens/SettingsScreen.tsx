// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

type SettingItem = {
  id: string;
  title: string;
  description: string;
  value: boolean;
};

const SettingsScreen = () => {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'notifications',
      title: 'プッシュ通知',
      description: '新着情報をプッシュ通知で受け取る',
      value: true,
    },
    {
      id: 'darkMode',
      title: 'ダークモード',
      description: 'アプリのテーマをダークモードに切り替える',
      value: false,
    },
    {
      id: 'saveData',
      title: 'データセーブモード',
      description: '画像の読み込みを最適化して通信量を節約する',
      value: false,
    },
    {
      id: 'autoUpdate',
      title: '自動更新',
      description: 'コンテンツを自動的に更新する',
      value: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(item =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>設定</Text>
      <View style={styles.settingsContainer}>
        {settings.map(setting => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={setting.value ? '#0284c7' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleToggle(setting.id)}
              value={setting.value}
            />
          </View>
        ))}
      </View>
      <Text style={styles.version}>アプリバージョン: 1.0.0</Text>
    </ScrollView>
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
  settingsContainer: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    color: '#9ca3af',
  },
});

export default SettingsScreen;
