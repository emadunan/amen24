import { Bookmark } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/users/bookmark`,
    credentials: "include",
  }),
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
      void,
      Omit<Bookmark, "title" | "profile" | "updatedAt">
    >({
      query: (bookmark) => {
        console.log(bookmark);

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

export const { useGetUserLastReadBookmarkQuery, useUpdateBookmarkMutation } =
  bookmarkApi;
