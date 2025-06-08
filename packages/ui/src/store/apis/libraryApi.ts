import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createLibraryApi = (baseUrl: string) =>
  createApi({
    reducerPath: "libraryApi",
    tagTypes: ["LibraryBook"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "library"),
    endpoints: (builder) => ({
      createLibraryBook: builder.mutation({
        query: (body) => ({
          method: "POST",
          url: ``,
          body,
        })
      }),
      getLibraryBooks: builder.query({
        query: () => ({
          url: ``,
        }),
      })
    }),
  });
