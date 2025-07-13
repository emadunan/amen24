import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { I18nManager, Platform, StyleSheet } from "react-native";
import { HapticTab } from "@/components/ui/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";
import AppHeader from "@/components/app-header/AppHeader";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import BackBtn from "@/components/ui/BackBtn";
import { useDispatch } from "react-redux";
import { setConnectionStatus } from "@/store/slices/networkSlice";
import NetInfo from "@react-native-community/netinfo";

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnectionStatus(state.isConnected));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Tabs
      initialRouteName="bible"
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.primary,
        tabBarActiveBackgroundColor: theme.secondary,
        tabBarInactiveBackgroundColor: theme.secondary,
        tabBarLabelStyle: {
          fontFamily: "AmiriBold",
          fontSize: 12,
          lineHeight: 16, // match or slightly exceed fontSize
          paddingBottom: 4, // optional fine-tuning
        },
        headerRight: () => <AppHeader />,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontFamily: "AmiriBold",
        },
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
          title: t("main.home"),
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: t("main.bible"),
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("main.search"),
          headerTitleStyle: {
            fontFamily: "AmiriBold",
          },
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

      <Tabs.Screen
        name="glossary"
        options={{
          title: t("main.glossary"),
          headerTitleStyle: {
            fontFamily: "AmiriBold",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-circle-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: t("library.title"),
          headerTitleStyle: {
            fontFamily: "AmiriBold",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          href: null,
          title: t("userMenu.favorite"),
          headerLeft: () => <BackBtn uri={"/bible"} />,
        }}
      />
      <Tabs.Screen
        name="featured"
        options={{
          href: null,
          title: t("userMenu.featured"),
          headerLeft: () => <BackBtn uri={"/bible"} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: t("userMenu.settings"),
          headerLeft: () => <BackBtn uri={"/bible"} />,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          href: null,
          title: t("signin.login"),
          headerLeft: () => <BackBtn uri={"/bible"} />,
        }}
      />

      <Tabs.Screen
        name="locale"
        options={{
          href: null,
          title: t("userMenu.favorite"),
          headerLeft: () => <BackBtn uri={"/bible"} />,
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
