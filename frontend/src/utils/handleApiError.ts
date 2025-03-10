import { showToast } from "./toast";
import { TFunction } from "i18next";

export function handleApiError(error: unknown, t: TFunction) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object"
  ) {
    const errorData = (error as any).data;

    // Check if "message" exists and is a string (which seems to be the case)
    if (typeof errorData.message === "string") {
      showToast(t(`error.${errorData.message}`), "error");
      return;
    }
  }

  // Fallback for unknown errors
  showToast(t("error.unknownError"), "error");
}
