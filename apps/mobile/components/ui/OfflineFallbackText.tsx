import React from 'react'
import { ThemedView } from './ThemedView'
import { StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText';
import { useTranslation } from 'react-i18next';
import { ERROR_KEYS } from '@amen24/shared';

const OfflineFallbackText: React.FC = () => {
  const { t } = useTranslation();

  return <ThemedView style={styles.container}>
    <ThemedText>{t(ERROR_KEYS.NO_DATA_OR_OFFLINE)}</ThemedText>
  </ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  }
});

export default OfflineFallbackText;