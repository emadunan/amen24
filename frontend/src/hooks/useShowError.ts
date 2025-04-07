// hooks/useShowError.ts
import { useTranslation } from "react-i18next";
import { showToast } from "@/utils/toast";

interface ApiError {
  data?: { message?: string };
}

export function useShowError() {
  const { t } = useTranslation("error");

  function showError(errorKey: string, fallback = "unknownError") {
    showToast(t(errorKey || fallback), "error");
  }

  function showApiError(error: unknown, fallback = "unknownError") {
    if (typeof error === "object" && error !== null && "data" in error) {
      const apiError = error as ApiError;
      const message = apiError.data?.message;

      if (message && typeof message === "string") {
        showToast(t(message), "error"); // assumes message is already namespaced
        return;
      }
    }

    showToast(t(fallback), "error");
  }

  return { showError, showApiError };
}
