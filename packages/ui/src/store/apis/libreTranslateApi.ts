import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

type Payload = {
  text: string,
  source?: string,
  target: string,
}

type Result = {
  translatedText: string,
}

export const createLibreTranslateApi = (baseUrl: string) =>
  createApi({
    reducerPath: "libreTranslateApi",
    baseQuery: createBaseQueryWithReauth(baseUrl, "translate"),
    endpoints: (builder) => ({
      translateText: builder.query<Result, Payload>({
        query: ({ text, target, source = 'ar' }) => ({
          url: ``,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: {
            text,
            source,
            target,
          }
        })
      }),
    }),
  });