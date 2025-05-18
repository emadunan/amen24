import { Lang, Verse, VerseGroup } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

type verseParams = {
  verseId: number,
  lang: Lang
}

export const createVerseApi = (baseUrl: string) =>
  createApi({
    reducerPath: "verseApi",
    tagTypes: ["VerseGroup", "VerseLang"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "verses"),
    endpoints: (builder) => ({
      getVerseGroups: builder.query<VerseGroup[], void>({
        query: () => `groups`,
        providesTags: ["VerseGroup"],
      }),
      getVerseById: builder.query<Verse, verseParams>({
        query: ({ verseId, lang }) => `${verseId}/${lang}`,
        providesTags: ["VerseLang"]
      })
    }),
  });
