import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

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
      getLibraryBooks: builder.query({
        query: () => ({
          url: ``,
        }),
      })
    }),
  });
