import React, { useEffect, useReducer } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  useColorScheme,
  I18nManager,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';
import { useTranslation } from 'react-i18next';
import { glossaryReducer, initialState, ActiveLang } from '@amen24/store';
import { Colors } from '@/constants';
import { Lang, BookKey, sanitizeWord, ERROR_KEYS } from '@amen24/shared';
import GlossaryVerse from './GlossaryVerse';
import { useAddTermMutation } from '@/store/apis/glossaryApi';
import { showToast } from '@/lib/toast';
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  verseId: number;
  bookKey: BookKey;
  isOpen: boolean;
  onClose: () => void;
};

type TranslationsPayload = {
  [lang: string]: { term: string; definition: string };
};

export default function GlossaryModal({ verseId, bookKey, isOpen, onClose }: Props) {
  const [glossaryState, glossaryDispatch] = useReducer(glossaryReducer, initialState);
  const [handleAddTerm] = useAddTermMutation();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const [verseTexts, setVerseTexts] = React.useState({
    na: '',
    ar: '',
    en: '',
  });

  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (!isOpen) return;

    const fetchVerseTexts = async () => {
      const langs: ActiveLang[] = [Lang.NATIVE, Lang.ARABIC, Lang.ENGLISH];

      const results = await Promise.all(
        langs.map((lang) =>
          db.getFirstAsync<{ text: string }>(
            `SELECT text FROM verse_translation WHERE verseId = ? AND lang = ?`,
            [verseId, lang],
          ),
        )
      );

      console.log(results);

      setVerseTexts({
        na: results[0]?.text ?? '',
        ar: results[1]?.text ?? '',
        en: results[2]?.text ?? '',
      });
    };

    fetchVerseTexts();
  }, [isOpen, verseId]);

  const handleAddWordToTerm = (lang: ActiveLang, raw: string) => {
    let word = raw;
    if (lang !== Lang.NATIVE) word = sanitizeWord(raw);
    glossaryDispatch({ type: 'add', lang, word });
  };

  const handleClearTerm = (lang?: ActiveLang) => {
    glossaryDispatch({ type: 'clear', lang });
  };

  const termSlug = glossaryState.en.join('-').toLowerCase();

  const handleAdd = async () => {
    const translations: TranslationsPayload = {};

    for (const [lang, words] of Object.entries(glossaryState).filter(
      ([lang]) => lang !== "na",
    )) {
      if (words.length < 1) {
        showToast('error', ERROR_KEYS.GLOSSARY_MISSING_TERM);
        return;
      }

      translations[lang] = {
        term: words.join(" "),
        definition: "",
      };
    }

    const payload = {
      slug: glossaryState.en.join("-").toLowerCase(),
      native: glossaryState.na.join(" "),
      verseIds: [verseId],
      translations,
    };

    try {
      const result = await handleAddTerm(payload).unwrap();
      console.log(result);

      showToast("success", result.message);
      handleClearTerm();
      onClose();
    } catch (error) {
      showToast("error", error as string);
    }
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <ThemedView style={[styles.modal]}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="window-close-o" size={28} color={theme.primary} />
          {/* <Text style={{ fontSize: 24, color: theme.text }}>×</Text> */}
        </Pressable>

        <ThemedText style={[styles.title, { color: theme.text }]}>{t('toolbox.addGlossaryTerm')}</ThemedText>
        <ThemedText type='subtitle' style={[styles.slug]}>Slug: {termSlug}</ThemedText>

        <ScrollView style={{ maxHeight: 400 }}>
          {verseTexts.na && (
            <GlossaryVerse
              lang={Lang.NATIVE}
              bookKey={bookKey}
              text={verseTexts.na}
              selectedWords={glossaryState.na}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
          {verseTexts.ar && (
            <GlossaryVerse
              lang={Lang.ARABIC}
              bookKey={bookKey}
              text={verseTexts.ar}
              selectedWords={glossaryState.ar}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
          {verseTexts.en && (
            <GlossaryVerse
              lang={Lang.ENGLISH}
              bookKey={bookKey}
              text={verseTexts.en}
              selectedWords={glossaryState.en}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
        </ScrollView>

        <View style={styles.btnRow}>
          <Pressable style={[styles.btn, {backgroundColor: theme.accent}]} onPress={handleAdd}>
            <Text style={styles.btnText}>{t('main.add')}</Text>
          </Pressable>
          <Pressable style={[styles.btn, {backgroundColor: theme.gray}]} onPress={() => handleClearTerm()}>
            <Text style={styles.btnText}>{t('main.clear')}</Text>
          </Pressable>
          <Pressable style={[styles.btn, {backgroundColor: theme.primary}, isRTL && { marginLeft: 0, marginRight: 'auto' }]} onPress={onClose}>
            <Text style={styles.btnText}>{t('main.cancel')}</Text>
          </Pressable>
        </View>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 2,
    padding: 24,
    maxWidth: 500,
    alignSelf: 'center',
    width: '95%',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'AmiriBold',
    fontSize: 20,
  },
  slug: {
    direction: "ltr",
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 2,
  },
  btnText: {
    color: 'white',
    fontFamily: 'AmiriRegular',
    fontWeight: 'bold',
  },
});
