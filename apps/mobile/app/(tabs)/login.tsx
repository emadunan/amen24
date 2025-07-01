import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { signInWithGoogle } from "@/lib/googleAuth";
import { Colors } from "@/constants";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useRouter } from "expo-router";


const Login = () => {
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    if (user) return router.replace("/(tabs)/bible");
  }, [user]);

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable style={[styles.button, styles.shadow]} onPress={handleGoogleLogin}>
        <AntDesign name="google" size={24} color={theme.secondary} style={styles.icon} />
        <Text style={styles.text}>Continue with Google</Text>
      </Pressable>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
