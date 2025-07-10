import React from 'react';
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGetMeQuery } from '@/store/apis/authApi';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDeleteAccountMutation } from '@/store/apis/profileApi';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  const [deleteAccount] = useDeleteAccountMutation();
  const { data: user } = useGetMeQuery();

  const handleDeleteAccount = async () => {
    Alert.alert(
      t('profileSettings.confirmDeleteTitle'),
      t('profileSettings.confirmDeleteMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('profileSettings.deleteAccount'),
          style: 'destructive',
          onPress: async () => {
            try {
              const { message } = await deleteAccount().unwrap();
              console.log(message);
              setTimeout(() => {
                router.replace('/login');
              }, 1000);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedView style={styles.section}>
        <ThemedText style={[styles.label, { color: theme.text }]}>
          {t('profileSettings.email')}
        </ThemedText>
        <ThemedText type='title' style={[styles.value, { color: theme.text }]}>
          {user?.email || '-'}
        </ThemedText>
      </ThemedView>

      <Pressable
        style={[styles.linkBtn, { borderColor: theme.primary }]}
        onPress={() => router.push('/')}
      >
        <MaterialCommunityIcons
          name="lock-reset"
          size={20}
          color={theme.text}
          style={{ marginRight: 8 }}
        />
        <ThemedText style={[styles.linkText, { color: theme.primary }]}>
          {t('signin.resetPassword')}
        </ThemedText>
      </Pressable>

      <Pressable
        style={[styles.deleteBtn, { backgroundColor: theme.danger }]}
        onPress={handleDeleteAccount}
      >
        <ThemedText type='title' style={[styles.deleteText]}>
          {t('profileSettings.deleteAccount')}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center"
  },
  value: {
    fontSize: 16,
    textAlign: "center"
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 2,
    marginBottom: 24,
  },
  linkText: {
    fontSize: 16,
  },
  deleteBtn: {
    padding: 14,
    borderRadius: 2,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SettingsScreen;
