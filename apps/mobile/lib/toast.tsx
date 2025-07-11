import Toast from "react-native-toast-message";
import i18n from "@/i18n/i18n";

type ToastType = "success" | "error" | "info";

export function showToast(
  type: ToastType,
  titleKey: string,
  messageKey?: string,
  options: { params?: Record<string, any> } = {},
) {
  Toast.show({
    type,
    text1: i18n.t(titleKey, options.params),
    text2: messageKey ? i18n.t(messageKey, options.params) : undefined,
  });
}

import { BaseToast, ErrorToast } from "react-native-toast-message";
import { ViewStyle } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={toastStyles.toastContainer}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontFamily: "AmiriRegular", fontSize: 16 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={toastStyles.toastContainer}
      text1Style={{ fontFamily: "AmiriRegular", fontSize: 16 }}
      text2Style={{ fontSize: 14 }}
    />
  ),
};

const toastStyles = {
  toastContainer: {
    zIndex: 9999, // High z-index to appear above logo
    elevation: 9999, // For Android
    borderLeftColor: "#4caf50",
  } as ViewStyle,
};
