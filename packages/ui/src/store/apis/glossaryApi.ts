import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { ApiMessage, ApprovalStatus, BibleGlossary, GlossaryCategory, Lang } from "@amen24/shared";

export type BibleGlossaryDto = {
  slug: string;
  native?: string;
  category?: GlossaryCategory;
  approvalStatus?: ApprovalStatus;
  translations?: {
    [langCode: string]: {
      term: string;
      definition: string;
    };
  };
  verseIds?: number[];
}

export type BibleGlossaryTranslationDto = {
  id: number;
  lang?: Lang;
  term?: string;
  definition?: string;
  glossary?: BibleGlossary;
}

export const createGlossaryApi = (baseUrl: string) =>
  createApi({
    reducerPath: "glossaryApi",
    tagTypes: ["GlossaryTerm"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "bible-glossary"),
    endpoints: (builder) => ({
      addTerm: builder.mutation<ApiMessage, BibleGlossaryDto>({
        query: (body) => ({
          method: "POST",
          url: ``,
          body,
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
      isTermExist: builder.query<boolean, string>({
        query: (term) => `check/${term}`,
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
      }),
      updateTranslation: builder.mutation<ApiMessage, BibleGlossaryTranslationDto>({
        query: (body) => ({
          url: `translation/${body.id}`,
          method: "PATCH",
          body: {
            term: body.term,
            definition: body.definition,
          }
        }),
        invalidatesTags: ["GlossaryTerm"]
      })
    }),
  });
