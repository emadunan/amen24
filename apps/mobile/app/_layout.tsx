import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import * as SystemUI from "expo-system-ui";
import * as Linking from 'expo-linking';

import { Colors } from "@/constants";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
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

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const url = event.url;
      const { queryParams } = Linking.parse(url);

      const accessToken = queryParams?.accessToken;
      const refreshToken = queryParams?.refreshToken;

      if (accessToken && refreshToken) {
        // Handle token storage, maybe navigate to home
        console.log("Received tokens from deep link");
        console.log(accessToken, refreshToken);

        // Save tokens to secure storage or context
        router.replace('/'); // or any page
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Optional: handle the initial URL (cold start)
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink({ url: initialUrl });
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SQLiteProvider
        databaseName="bible.db"
        assetSource={{ assetId: require("@/data/bible.db") }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SQLiteProvider>
    </I18nextProvider>
  );
}
