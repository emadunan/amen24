import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemedView } from './ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants';
import { useTranslation } from 'react-i18next';
import { ERROR_KEYS } from '@amen24/shared';

const NetworkIndicator: React.FC = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  if (isConnected) return null;

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.highlight, borderColor: theme.highlight }]}>
      <MaterialIcons name="warning-amber" size={18} color={theme.text} />
      <ThemedText style={{ color: theme.text }}>{t(ERROR_KEYS.NO_INTERNET)}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 48,
    zIndex: 80,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 2,
  }
})

export default NetworkIndicator