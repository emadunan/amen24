import { createQuotaTrackerApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const quotaTrackerApi = createQuotaTrackerApi(apiUrl);

export const {
  useGetProviderQuotaQuery
} = quotaTrackerApi;
