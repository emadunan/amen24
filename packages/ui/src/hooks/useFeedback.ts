import { TFunction } from "i18next";
import { showToast } from "../utils/toast";

interface ApiError {
  data?: { message?: string };
}

export function useFeedback(t: TFunction) {
  function showMessage(
    key: string,
    type: "success" | "info" | "warning" | "error" = "info",
    fallback = "message:unknownSuccess",
  ) {
    showToast(t(key || fallback), type);
  }

  function showError(errorKey: string, fallback = "error:unknownError") {
    showMessage(errorKey, "error", fallback);
  }

  function showApiError(error: unknown, fallback = "error:unknownError") {
    if (typeof error === "object" && error !== null && "data" in error) {
      const apiError = error as ApiError;
      const message = apiError.data?.message;

      if (message && typeof message === "string") {
        showError(message, fallback);
        return;
      }
    }

    showError(fallback, fallback);
  }

  return {
    showMessage,
    showError,
    showApiError,
  };
}
