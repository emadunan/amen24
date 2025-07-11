import { Colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { FC } from "react";
import {
  I18nManager,
  Pressable,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";

interface Props {
  color?: string;
  uri?: Href;
  style?: ViewStyle | ViewStyle[];
}

const BackBtn: FC<Props> = ({ uri, color, style }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  function handlePress() {
    if (!uri) return router.back();

    router.replace(uri);
  }
  return (
    <Pressable onPress={handlePress} style={[styles.button, style]}>
      {I18nManager.isRTL ? (
        <AntDesign name="arrowright" size={24} color={color ?? theme.text} />
      ) : (
        <AntDesign name="arrowleft" size={24} color={color ?? theme.text} />
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
