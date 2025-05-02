import { VerseGroup } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createVerseApi = (baseUrl: string) =>
  createApi({
    reducerPath: "verseApi",
    tagTypes: ["VerseGroup"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "verses"),
    endpoints: (builder) => ({
      getVerseGroups: builder.query<VerseGroup[], void>({
        query: () => `groups`,
        providesTags: ["VerseGroup"],
      }),
    }),
  });
