import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";

const useBackAsExit = () => {
  const { t } = useTranslation();
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        t("exit-title", { ns: "ui" }),
        t("exit-dialog", { ns: "ui" }),
        [
          { text: t("cancel", { ns: "ui" }), style: "cancel" },
          {
            text: t("exit", { ns: "ui" }),
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
