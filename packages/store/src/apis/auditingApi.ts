import { AuditingRecord } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createAuditingApi = (baseUrl: string) =>
  createApi({
    reducerPath: "auditingApi",
    tagTypes: ["AuditingRecord"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "auditing"),
    endpoints: (builder) => ({
      getAuditingRecords: builder.query<AuditingRecord[], void>({
        query: () => ``,
        providesTags: ["AuditingRecord"],
      }),
    }),
  });
