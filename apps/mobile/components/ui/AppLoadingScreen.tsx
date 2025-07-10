import { ActivityIndicator } from 'react-native';
import { ThemedView } from './ThemedView';

const AppLoadingScreen = () => (
  <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </ThemedView>
);

export default AppLoadingScreen;