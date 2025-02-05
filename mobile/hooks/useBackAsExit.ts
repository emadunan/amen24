import { useFocusEffect } from 'expo-router';
import { Alert, BackHandler } from 'react-native';

const useBackAsExit = () => {
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert("Exit App", "Do you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  });
}

export default useBackAsExit