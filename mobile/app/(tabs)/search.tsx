import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}><ThemedText>Explore</ThemedText></ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
