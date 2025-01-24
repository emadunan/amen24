import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].text,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].text,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].text,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].background,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="newspaper" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: t('bible'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('search'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="manatsign" color={color} />,
        }}
      />
    </Tabs>
  );
}
