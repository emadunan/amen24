import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { ApiMessage, BibleGlossary } from "@amen24/shared";

export type CreateBibleGlossaryDto = {
  slug: string;
  translations: {
    [langCode: string]: {
      term: string;
      definition: string;
    };
  };
  verseIds?: number[];
}

export const createGlossaryApi = (baseUrl: string) =>
  createApi({
    reducerPath: "glossaryApi",
    tagTypes: ["GlossaryTerm"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "bible-glossary"),
    endpoints: (builder) => ({
      addGlossaryTerm: builder.mutation<ApiMessage, CreateBibleGlossaryDto>({
        query: (body) => ({
          method: "POST",
          url: ``,
          body,
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
      checkTermByTitle: builder.query<boolean, string>({
        query: (title) => `check/${title}`,
        providesTags: ["GlossaryTerm"]
      }),
      getAllTerms: builder.query<BibleGlossary[], void>({
        query: () => ``,
        providesTags: ["GlossaryTerm"]
      })
    }),
  });
