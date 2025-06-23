import React from "react";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants";
import { useRouter } from "expo-router";

const LoginBtn = () => {
  const router = useRouter();

  function handleRedirect() {
    router.replace("/login");
  }

  return (
    <Pressable onPress={handleRedirect}>
      <AntDesign name="login" size={24} color={Colors.light.primary} />
    </Pressable>
  );
};

export default LoginBtn;
