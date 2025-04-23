import { Bookmark } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createBookmarkApi = (baseUrl: string) => createApi({
  reducerPath: "bookmarkApi",
  baseQuery: createBaseQueryWithReauth(baseUrl, "users/bookmark"),
  tagTypes: ["Bookmark"],
  endpoints: (builder) => ({
    getUserLastReadBookmark: builder.query<Bookmark, void>({
      query: () => "",
      providesTags: ["Bookmark"],
    }),
    createBookmark: builder.mutation<void, void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Bookmark"],
    }),
    updateBookmark: builder.mutation<
      Bookmark,
      { id: number; profileEmail: string; verseId: number }
    >({
      query: (bookmark) => {
        return {
          url: "/",
          method: "PATCH",
          body: bookmark,
        };
      },
      invalidatesTags: ["Bookmark"],
    }),
    deleteBookmark: builder.mutation<void, void>({
      query: () => ({
        url: "",
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Bookmark"],
    }),
  }),
});
