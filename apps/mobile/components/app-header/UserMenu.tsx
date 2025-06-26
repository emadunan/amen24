import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, I18nManager, Modal } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { logout } from '@/lib/auth';
import { authApi, useGetMeQuery } from '@/store/apis/authApi';
import { useDispatch } from 'react-redux';
import { Link, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const isRTL = I18nManager.isRTL;
  const { data: user } = useGetMeQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const { t } = useTranslation();

  const firstLetter = user?.displayName?.[0]?.toUpperCase() ?? '?';

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
        <Text style={[styles.letter, { color: theme.text }]}>{firstLetter}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setOpen(false)}
        >
          <ThemedView
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.background,
                borderColor: theme.primary,
                right: isRTL ? undefined : 16,
                left: isRTL ? 16 : undefined,
              },
            ]}
          >
            <Link href="/(tabs)/favorites">
              <ThemedText style={styles.item}>{t("userMenu.favorite")}</ThemedText>
            </Link>

            <View style={styles.divider} />
            <Pressable onPress={() => { logout(); dispatch(authApi.util.resetApiState()); setOpen(false); }}>
              <ThemedText style={[styles.item, { color: theme.accent }]}>{t("userMenu.logout")}</ThemedText>
            </Pressable>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    zIndex: 999,
  },
  item: {
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    marginVertical: 4,
    backgroundColor: '#ccc',
  },
});

export default UserMenu;
