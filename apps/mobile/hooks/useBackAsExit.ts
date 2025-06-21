import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";

const useBackAsExit = () => {
  const { t } = useTranslation();
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        t("main.exitTitle"),
        t("main.exitDialog"),
        [
          { text: t("main.cancel"), style: "cancel" },
          {
            text: t("main.exit"),
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  });
};

export default useBackAsExit;
