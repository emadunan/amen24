import React from "react";
import { Pressable } from "react-native";
import { Colors } from "@/constants";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LocaleSelector = () => {
  return (
    <Link href="/locale" asChild>
      <Pressable>
        <MaterialIcons name="language" size={24} color={Colors.light.primary} />
      </Pressable>
    </Link>
  );
};

export default LocaleSelector;
