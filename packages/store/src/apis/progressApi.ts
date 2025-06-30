import { Progress } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth, Options } from "../config/crossBaseQueryWithReauth";

export const createProgressApi = (baseUrl: string, options?: Options) =>
  createApi({
    reducerPath: "progressApi",
    baseQuery: createBaseQueryWithReauth(baseUrl, "progress", options),
    tagTypes: ["Progress"],
    endpoints: (builder) => ({
      getUserLastReadProgress: builder.query<Progress, void>({
        query: () => "last-read",
        providesTags: ["Progress"],
      }),
      createProgress: builder.mutation<void, void>({
        query: () => ({
          url: "",
          method: "POST",
          body: {},
        }),
        invalidatesTags: ["Progress"],
      }),
      updateProgress: builder.mutation<
        Progress,
        { id: number; profileEmail: string; verseId: number }
      >({
        query: (progress) => {
          return {
            url: "",
            method: "PATCH",
            body: progress,
          };
        },
        invalidatesTags: ["Progress"],
      }),
    }),
  });
