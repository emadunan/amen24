import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";

const useBackAsExit = () => {
  const { t } = useTranslation();
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(t("main.exitTitle"), t("main.exitDialog"), [
        { text: t("main.cancel"), style: "cancel" },
        {
          text: t("main.exit"),
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  });
};

export default useBackAsExit;
