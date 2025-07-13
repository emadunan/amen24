import Toast from "react-native-toast-message";
import i18n from "@/i18n/i18n";

type ToastType = "success" | "error" | "info";

export function showToast(
  type: ToastType,
  messageKey?: string,
  options: { params?: Record<string, any> } = {},
) {
  Toast.show({
    type,
    text2: messageKey ? i18n.t(messageKey, options.params) : undefined,
  });
}

import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4caf50" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: "#000", fontFamily: "AmiriRegular", fontSize: 16 }}
      text2Style={{ color: "#000", fontFamily: "AmiriRegular", fontSize: 14 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{ color: "#000", fontFamily: "AmiriRegular", fontSize: 16 }}
      text2Style={{ color: "#000", fontFamily: "AmiriRegular", fontSize: 14 }}
    />
  ),
};