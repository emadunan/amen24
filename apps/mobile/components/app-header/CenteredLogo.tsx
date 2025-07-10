import { toastConfig } from "@/lib/toast";
import { Link } from "expo-router";
import React from "react";
import { Image, View, StyleSheet, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

const CenteredLogo = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Link href={`/(tabs)/bible`}>
        <Image
          source={
            isDark
              ? require("@/assets/images/logo-dark.png")
              : require("@/assets/images/logo-light.png")
          }
          style={styles.logo}
          resizeMode="contain"
        />
      </Link>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 99,
  },
  logo: {
    width: 72,
    height: 72,
    pointerEvents: "none",     // Let touches pass through the logo
  },
});

export default CenteredLogo;
