import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

type QuotaState = {
  value: number;
  max: number;
};

export const createQuotaTrackerApi = (baseUrl: string) =>
  createApi({
    reducerPath: "quotaTrackerApi",
    tagTypes: ["Quota"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "quota-tracker"),
    endpoints: (builder) => ({
      getProviderQuota: builder.query<QuotaState, string>({
        query: (provider) => `${provider}`,
        providesTags: ["Quota"],
      }),
    }),
  });
