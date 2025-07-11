import { toastConfig } from "@/lib/toast";
import React from "react";
import {
  Image,
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const AppLogo = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const handlePress = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Pressable
        onPress={handlePress}
        style={styles.pressable}
        pointerEvents="auto"
      >
        <Image
          source={
            isDark
              ? require("@/assets/images/logo-dark.png")
              : require("@/assets/images/logo-light.png")
          }
          style={styles.logo}
          resizeMode="contain"
        />
      </Pressable>
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
    pointerEvents: "box-none", // 👈 allow children to receive touches
  },
  pressable: {
    zIndex: 100,
    pointerEvents: "auto", // 👈 explicitly allows this to receive touches
  },
  logo: {
    width: 72,
    height: 72,
  },
});

export default AppLogo;
