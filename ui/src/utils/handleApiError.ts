import { showToast } from "./toast";
import { TFunction } from "i18next";

interface ApiError {
  data?: { message?: string };
}

export function handleApiError(error: unknown, t: TFunction) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const errorData = (error as ApiError).data;

    if (errorData && typeof errorData.message === "string") {
      showToast(t(`error:${errorData.message}`), "error");
      return;
    }
  }

  showToast(t("error:unknownError"), "error");
}
