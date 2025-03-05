import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Profile, User } from "@amen24/shared";

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/users/" }),
  tagTypes: ["theme"],
  endpoints: (builder) => ({
    getProfileByEmail: builder.query<User, string>({
      query: () => `fc89a78c-8019-4ea1-aeb9-9793eff5e339`,
      providesTags: ["theme"],
    }),
    toggleProfileTheme: builder.mutation<void, void>({
      query: () => ({
        url: `profile/toggle-theme/`,
        method: "PATCH",
        body: {
          email: "emadunan@gmail.com",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWR1bmFuQGdtYWlsLmNvbSIsInN1YiI6ImZjODlhNzhjLTgwMTktNGVhMS1hZWI5LTk3OTNlZmY1ZTMzOSIsImlhdCI6MTc0MDMwOTUxMSwiZXhwIjoxNzQwMzEzMTExfQ.rxkSHIh7dWMkc4Ys4Xt2HvLG8kiw_EdRrgZlrngqYKk",
        },
      }),
      invalidatesTags: ["theme"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileByEmailQuery, useToggleProfileThemeMutation } =
  profileApi;
