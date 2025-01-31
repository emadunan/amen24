import React from "react";
import { StyleSheet, View } from "react-native";
import LocaleSelector from "./LocaleSelector";
import LoginBtn from "./LoginBtn";

const AppHeader = () => {
  return (
    <View style={styles.btnsContainer}>
      <LocaleSelector />
      {/* <LoginBtn /> */}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
  },
});
