import React from "react";
import { Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LocaleSelector = () => {
  const router = useRouter();

  function handleRedirect() {
    router.replace("/locale");
  }

  return (
    <Pressable onPress={handleRedirect}>
      <MaterialIcons name="language" size={24} color={Colors.light.primary} />
    </Pressable>
  );
};

export default LocaleSelector;
