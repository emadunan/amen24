import { TextInput, type TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  style,
  lightColor,
  darkColor,
  ...rest
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "text");

  return (
    <TextInput
      style={[
        styles.input,
        { backgroundColor, color: textColor, borderColor },
        style,
      ]}
      placeholderTextColor={textColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "AmiriRegular",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
});
