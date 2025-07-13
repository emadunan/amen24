import { showToast } from "@/lib/toast";

interface ApiError {
  data?: { message?: string };
}

type ToastType = "success" | "error" | "info";

export function useFeedback() {
  function showMessage(
    type: ToastType = "info",
    messageKey?: string,
    fallback = "message:unknownSuccess",
    params?: Record<string, any>
  ) {
    showToast(type, messageKey || fallback, { params });
  }

  function showError(
    messageKey?: string,
    fallback = "error:unknownError",
    params?: Record<string, any>
  ) {
    showMessage("error", messageKey, fallback, params);
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
