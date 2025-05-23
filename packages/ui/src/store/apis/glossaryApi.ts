import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { ApiMessage, BibleGlossary } from "@amen24/shared";

export type BibleGlossaryDto = {
  slug: string;
  native?: string;
  translations?: {
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
      addGlossaryTerm: builder.mutation<ApiMessage, BibleGlossaryDto>({
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
      getOneTerm: builder.query<BibleGlossary, string>({
        query: (slug) => `${slug}`,
        providesTags: ["GlossaryTerm"]
      }),
      getAllTerms: builder.query<BibleGlossary[], { slug?: string } | void>({
        query: (q) => {
          if (q?.slug) {
            return `?slug=${q.slug}`;
          }

          return ``;
        },
        providesTags: ["GlossaryTerm"]
      }),
      updateTerm: builder.mutation<ApiMessage, BibleGlossaryDto>({
        query: (body) => ({
          url: `${body.slug}`,
          method: "PATCH",
          body
        }),
        invalidatesTags: ["GlossaryTerm"]
      })
    }),
  });
