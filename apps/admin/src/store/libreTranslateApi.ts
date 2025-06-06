import { createLibreTranslateApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const libreTranslateApi = createLibreTranslateApi(apiUrl);

export const { useLazyTranslateTextQuery } = libreTranslateApi;
