import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { LibraryBook, LibraryChapter } from "@amen24/shared";

type UpdateLibraryChapterDto = {
  id: string;
  title?: string;
  order?: number;
  content?: string;
};

export const createLibraryApi = (baseUrl: string) =>
  createApi({
    reducerPath: "libraryApi",
    tagTypes: ["LibraryBook"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "library"),
    endpoints: (builder) => ({
      createLibraryBook: builder.mutation<LibraryBook, FormData>({
        query: (formData) => ({
          method: "POST",
          url: ``,
          body: formData
        }),
        invalidatesTags: ["LibraryBook"]
      }),
      createLibraryChapter: builder.mutation<LibraryChapter, Partial<LibraryChapter> & { slug: string }>({
        query: (body) => ({
          method: "POST",
          url: `chapter`,
          body
        }),
        invalidatesTags: ["LibraryBook"]
      }),
      getLibraryBooks: builder.query<LibraryBook[], void>({
        query: () => ({
          url: ``,
        }),
        providesTags: ["LibraryBook"]
      }),
      getLibraryBook: builder.query<LibraryBook, string>({
        query: (slug) => ({
          url: `slug/${slug}`,
        }),
        providesTags: ["LibraryBook"]
      }),
      getLibraryChapter: builder.query<LibraryChapter, string>({
        query: (id) => ({
          url: `chapter/${id}`,
        }),
        providesTags: ["LibraryBook"]
      }),
      updateLibraryBook: builder.mutation<LibraryBook, Partial<LibraryBook>>({
        query: (body) => ({
          url: `${body.id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["LibraryBook"]
      }),
      updateLibraryChapter: builder.mutation<LibraryChapter, UpdateLibraryChapterDto>({
        query: ({ id, title, order, content }) => {
          console.log("🔥 updateLibraryChapter called", { id, title, order, content });

          const body = {
            ...(title !== undefined && { title }),
            ...(order !== undefined && { order }),
            ...(content !== undefined && { content }),
          };

          return {
            url: `chapter/${id}`,
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: ["LibraryBook"]
      }),
    }),
  });
