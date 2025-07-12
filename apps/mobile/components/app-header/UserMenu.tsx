import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  I18nManager,
  Modal,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { logout } from "@/lib/auth";
import { authApi, useGetMeQuery } from "@/store/apis/authApi";
import { useDispatch } from "react-redux";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isRTL = I18nManager.isRTL;
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const { t } = useTranslation();

  const firstLetter = user?.displayName?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.button,
          {
            backgroundColor: theme.secondary,
            borderColor: theme.primary,
          },
        ]}
      >
        <Text style={[styles.letter, { color: theme.text }]}>
          {firstLetter}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <ThemedView
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.background,
                borderColor: theme.primary,
                right: 16,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Link href="/(tabs)/favorites" asChild>
                <Pressable onPress={() => setOpen(false)}>
                  <ThemedText style={styles.item}>
                    {t("userMenu.favorite")}
                  </ThemedText>
                </Pressable>
              </Link>

              <Link href="/(tabs)/settings" asChild>
                <Pressable onPress={() => setOpen(false)}>
                  <ThemedText style={styles.item}>
                    {t("userMenu.settings")}
                  </ThemedText>
                </Pressable>
              </Link>

              <Link href="/(tabs)/featured" asChild>
                <Pressable onPress={() => setOpen(false)}>
                  <ThemedText style={styles.item}>
                    {t("userMenu.featured")}
                  </ThemedText>
                </Pressable>
              </Link>

              <View
                style={[styles.divider, { backgroundColor: theme.primary }]}
              />

              <Pressable
                onPress={() => {
                  logout();
                  dispatch(authApi.util.resetApiState());
                  setOpen(false);
                }}
              >
                <ThemedText style={[styles.item]}>
                  {t("userMenu.logout")}
                </ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 18,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    minWidth: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
    zIndex: 999,
  },
  item: {
    paddingVertical: 8,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? "left" : "right",
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});

export default UserMenu;
