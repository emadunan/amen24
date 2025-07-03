import { createApi } from "@reduxjs/toolkit/query/react";
import { LibraryBook, LibraryChapter } from "@amen24/shared";
import { Options, createBaseQueryWithReauth } from "../config/crossBaseQueryWithReauth";

type UpdateLibraryChapterDto = {
  id: string;
  title?: string;
  order?: number;
  content?: string;
};

interface LibraryBookDto extends LibraryBook {
  firstChapterId?: string | null;
}

export const createLibraryApi = (baseUrl: string, options?: Options) =>
  createApi({
    reducerPath: "libraryApi",
    tagTypes: ["LibraryBook"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "library", options),
    endpoints: (builder) => ({
      createLibraryBook: builder.mutation<LibraryBook, FormData>({
        query: (formData) => ({
          method: "POST",
          url: ``,
          body: formData,
        }),
        invalidatesTags: ["LibraryBook"],
      }),
      createLibraryChapter: builder.mutation<
        LibraryChapter,
        Partial<LibraryChapter> & { slug: string }
      >({
        query: (body) => ({
          method: "POST",
          url: `chapter`,
          body,
        }),
        invalidatesTags: ["LibraryBook"],
      }),
      getLibraryBooks: builder.query<LibraryBookDto[], void>({
        query: () => ({
          url: ``,
        }),
        providesTags: ["LibraryBook"],
      }),
      getLibraryBook: builder.query<LibraryBook, string>({
        query: (slug) => ({
          url: `slug/${slug}`,
        }),
        providesTags: ["LibraryBook"],
      }),
      getLibraryChapter: builder.query<LibraryChapter, string>({
        query: (id) => ({
          url: `chapter/${id}`,
        }),
        providesTags: ["LibraryBook"],
      }),
      getLibraryChapterNextOrder: builder.query<number, string>({
        query: (slug) => ({
          url: `chapter/order/${slug}`,
        }),
        providesTags: ["LibraryBook"],
      }),
      updateLibraryBook: builder.mutation<LibraryBook, Partial<LibraryBook>>({
        query: (body) => ({
          url: `${body.id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["LibraryBook"],
      }),
      updateLibraryChapter: builder.mutation<
        LibraryChapter,
        UpdateLibraryChapterDto
      >({
        query: ({ id, title, order, content }) => {
          console.log("🔥 updateLibraryChapter called", {
            id,
            title,
            order,
            content,
          });

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
        invalidatesTags: ["LibraryBook"],
      }),
      deleteLibraryBook: builder.mutation<void, string>({
        query: (id) => ({
          url: `${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["LibraryBook"],
      }),
      deleteLibraryChapter: builder.mutation<void, string>({
        query: (id) => ({
          url: `chapter/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["LibraryBook"],
      }),
      changeLibraryChapterOrder: builder.mutation<
        void,
        { slug: string; body: { chapterOrder: number; targetOrder: number } }
      >({
        query: ({ slug, body }) => ({
          url: `chapter/order/${slug}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["LibraryBook"],
      }),
    }),
  });
