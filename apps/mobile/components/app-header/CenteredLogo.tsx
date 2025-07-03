import { toastConfig } from "@/lib/toast";
import React from "react";
import { Image, View, StyleSheet, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

const CenteredLogo = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Image
        source={
          isDark
            ? require("@/assets/images/logo-dark.png")
            : require("@/assets/images/logo-light.png")
        }
        style={styles.logo}
        resizeMode="contain"
      />

      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 34,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 99,
    pointerEvents: "none", // Let touches pass through the logo
  },
  logo: {
    width: 92,
    height: 92,
  },
});

export default CenteredLogo;
