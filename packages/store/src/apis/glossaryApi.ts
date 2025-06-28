import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../config/baseQueryWithReauth";
import {
  Lang,
  ApiMessage,
  ApprovalStatus,
  BibleGlossary,
  BibleGlossaryQuery,
  GlossaryCategory,
  PaginatedResult,
} from "@amen24/shared";

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
};

export type BibleGlossaryTranslationDto = {
  id: number;
  lang?: Lang;
  term?: string;
  definition?: string;
  glossary?: BibleGlossary;
};

export type BibleGlossaryResult = PaginatedResult<BibleGlossary>;

export type AiGeneratedTerm = {
  term: string;
  definition: string;
};

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
      generateAiDefinition: builder.mutation<
        AiGeneratedTerm,
        {
          slug: string;
          term: string;
          native: string;
          verseRef: string;
          useCache: boolean;
        }
      >({
        query: ({ slug, term, native, verseRef, useCache }) => ({
          method: "POST",
          url: `ai-generate`,
          body: { slug, term, native, verseRef, useCache },
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
      isTermExist: builder.query<boolean, string>({
        query: (term) => `check/${term}`,
        providesTags: ["GlossaryTerm"],
      }),
      getOneTerm: builder.query<BibleGlossary, string>({
        query: (slug) => `${slug}`,
        providesTags: ["GlossaryTerm"],
      }),
      getAllTerms: builder.query<
        BibleGlossaryResult,
        BibleGlossaryQuery | void
      >({
        query: (q) => {
          if (!q) return "";

          const params = new URLSearchParams();

          if (q.slug) params.append("slug", q.slug);
          if (q.lang) params.append("lang", q.lang);
          if (q.term) params.append("term", q.term);
          if (q.bookKey) params.append("bookKey", q.bookKey);
          if (q.chapter) params.append("chapter", q.chapter);
          if (q.approvalStatus)
            params.append("approvalStatus", q.approvalStatus);
          if (q.page) params.append("page", q.page.toString());
          if (q.limit) params.append("limit", q.limit.toString());

          const queryString = params.toString();

          return queryString ? `?${queryString}` : "";
        },
        providesTags: ["GlossaryTerm"],
      }),
      updateTerm: builder.mutation<ApiMessage, BibleGlossaryDto>({
        query: (body) => ({
          url: `${body.slug}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
      updateTranslation: builder.mutation<
        ApiMessage,
        BibleGlossaryTranslationDto
      >({
        query: (body) => ({
          url: `translation/${body.id}`,
          method: "PATCH",
          body: {
            term: body.term,
            definition: body.definition,
          },
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
      deleteTerm: builder.mutation<void, string>({
        query: (slug) => ({
          url: `${slug}`,
          method: "DELETE",
        }),
        invalidatesTags: ["GlossaryTerm"],
      }),
    }),
  });
