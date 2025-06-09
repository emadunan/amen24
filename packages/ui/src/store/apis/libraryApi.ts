import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { LibraryBook } from "@amen24/shared";

export const createLibraryApi = (baseUrl: string) =>
  createApi({
    reducerPath: "libraryApi",
    tagTypes: ["LibraryBook"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "library"),
    endpoints: (builder) => ({
      createLibraryBook: builder.mutation<any, FormData>({
        query: (formData) => ({
          method: "POST",
          url: ``,
          body: formData
        })
      }),
      getLibraryBooks: builder.query<LibraryBook[], void>({
        query: () => ({
          url: ``,
        }),
      })
    }),
  });
