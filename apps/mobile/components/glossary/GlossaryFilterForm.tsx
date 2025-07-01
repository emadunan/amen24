import React from 'react';
import {
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  I18nManager,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useTranslation } from 'react-i18next';

interface Props {
  query: string;
  onQueryChange: (text: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

const GlossaryFilterForm: React.FC<Props> = ({
  query,
  onQueryChange,
  onSubmit,
  onReset,
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const isRTL = I18nManager.isRTL;

  return (
    <ThemedView style={[styles.container]}>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder={t('common:glossary.filterPlaceholder')}
        style={[styles.input, { borderColor: theme.primary, color: theme.text, fontFamily: "AmiriRegular" }]}
        placeholderTextColor={theme.text}
      />

      <ThemedView style={[styles.buttons, {direction: isRTL ? "rtl" : "ltr"}]}>
        <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={onReset}>
          <AntDesign name="sync" size={18} color={theme.background} />
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={onSubmit}>
          <AntDesign name="filter" size={18} color={theme.background} />
          <ThemedText style={[styles.buttonText, { color: theme.background }]}>
            {t('glossary.filter')}</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
  },
  select: {
    ...Platform.select({
      android: {
        backgroundColor: '#fff',
      },
    }),
    borderWidth: 1,
    borderRadius: 2,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8
  },
  buttonText: {},
});

export default GlossaryFilterForm;
