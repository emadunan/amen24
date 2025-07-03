import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import * as SystemUI from "expo-system-ui";

import { Colors } from "@/constants";
import StoreProvider from "@/providers/StoreProvider";
import CenteredLogo from "@/components/app-header/CenteredLogo";
import { ThemedView } from "@/components/ThemedView";
import Toast from 'react-native-toast-message';
import { toastConfig } from "@/lib/toast";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AmiriRegular: require("../assets/fonts/Amiri/Amiri-Regular.ttf"),
    AmiriBold: require("../assets/fonts/Amiri/Amiri-Bold.ttf"),
  });

  useEffect(() => {
    // Set background color dynamically
    SystemUI.setBackgroundColorAsync(Colors[colorScheme ?? "light"].background);
  }, [colorScheme]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StoreProvider>
        <I18nextProvider i18n={i18n}>
          <SQLiteProvider
            databaseName="bible.db"
            assetSource={{ assetId: require("@/data/bible.db") }}
          >
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <ThemedView style={{ flex: 1 }}>
                <CenteredLogo />
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </ThemedView>
              <StatusBar style="auto" />
            </ThemeProvider>
          </SQLiteProvider>
        </I18nextProvider>
      </StoreProvider>
    </>
  );
}