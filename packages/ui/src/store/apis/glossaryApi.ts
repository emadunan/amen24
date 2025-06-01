import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { ApiMessage, ApprovalStatus, BibleGlossary, BibleGlossaryQuery, GlossaryCategory, Lang, PaginatedResult } from "@amen24/shared";

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

export type BibleGlossaryResult = PaginatedResult<BibleGlossary>;

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
      getAllTerms: builder.query<BibleGlossaryResult, BibleGlossaryQuery | void>({
        query: (q) => {
          if (!q) return '';

          const params = new URLSearchParams();

          if (q.slug) params.append('slug', q.slug);
          if (q.lang) params.append('lang', q.lang);
          if (q.term) params.append('term', q.term);
          if (q.page) params.append('page', q.page.toString());
          if (q.limit) params.append('limit', q.limit.toString());

          const queryString = params.toString();

          return queryString ? `?${queryString}` : '';
        },
        providesTags: ['GlossaryTerm'],
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
