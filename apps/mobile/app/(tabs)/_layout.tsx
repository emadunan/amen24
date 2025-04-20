import { Tabs } from "expo-router";
import React from "react";
import { I18nManager, Platform, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";
import AppHeader from "@/components/app-header/AppHeader";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="bible"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? "light"].secondary,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? "light"].secondary,
        headerRight: () => <AppHeader />,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTintColor: Colors[colorScheme ?? "light"].text,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          title: t("home"),
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: t("bible"),
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("search"),
          tabBarIcon: ({ color }) => (
            <Feather
              name="search"
              size={24}
              color={color}
              style={I18nManager.isRTL && styles.flipIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
});
