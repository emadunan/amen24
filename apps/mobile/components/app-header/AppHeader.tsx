import React from "react";
import { StyleSheet, View } from "react-native";
import LocaleSelector from "./LocaleSelector";
import LoginBtn from "./LoginBtn";
import { useGetMeQuery } from "@/store/apis/authApi";
import UserMenu from "./UserMenu";
import ReadingProgress from "./ReadingProgress";

const AppHeader = () => {
  const { data: user } = useGetMeQuery();

  return (
    <View style={styles.btnsContainer}>
      <ReadingProgress />
      <LocaleSelector />
      <View style={styles.authContainer}>
        {user ? <UserMenu /> : <LoginBtn />}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
  },
  authContainer: {
    minWidth: 40, // Make sure both components have enough space
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
