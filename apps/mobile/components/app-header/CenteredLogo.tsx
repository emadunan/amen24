import React from "react";
import { Image, View, StyleSheet } from "react-native";

const CenteredLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, // or whatever space you want from the top
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
    pointerEvents: "none", // Let touches pass through the logo
  },
  logo: {
    width: 92,
    height: 92,
  },
});

export default CenteredLogo;
