import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { I18nManager, Pressable, StyleSheet } from "react-native";

interface Props {
  color?: string;
  uri?: string;
}

const BackBtn: FC<Props> = ({ uri, color }) => {
  const router = useRouter();
  function handlePress() {
    if (!uri) return router.back();

    router.replace(uri);
  }
  return (
    <Pressable onPress={handlePress} style={styles.button}>
      {I18nManager.isRTL ? (
        <AntDesign name="arrowright" size={24} color={color || "black"} />
      ) : (
        <AntDesign name="arrowleft" size={24} color={color || "black"} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
  },
});

export default BackBtn;
