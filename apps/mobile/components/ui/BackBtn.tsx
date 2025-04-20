import { AntDesign } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { FC } from "react";
import { I18nManager, Pressable, StyleSheet, ViewStyle } from "react-native";

interface Props {
  color?: string;
  uri?: Href;
  style?: ViewStyle | ViewStyle[];
}

const BackBtn: FC<Props> = ({ uri, color, style }) => {
  const router = useRouter();
  function handlePress() {
    if (!uri) return router.back();

    router.replace(uri);
  }
  return (
    <Pressable onPress={handlePress} style={[styles.button, style]}>
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
