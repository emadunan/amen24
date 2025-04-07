import { useTranslation } from "react-i18next";
import { showToast } from "@/utils/toast";

export function useShowMessage() {
  const { t } = useTranslation("message");

  function showMessage(
    messageKey: string,
    type: "success" | "info" | "warning" | "error" = "info",
    fallback = "unknownSuccess",
  ) {
    showToast(t(messageKey || fallback), type);
  }

  return { showMessage };
}
