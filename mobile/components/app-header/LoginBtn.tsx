import React from "react";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

const LoginBtn = () => {
  return (
    <Pressable onPress={() => {}}>
      <AntDesign name="login" size={24} color={Colors.light.primary} />
    </Pressable>
  );
};

export default LoginBtn;
