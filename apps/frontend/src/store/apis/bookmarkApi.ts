import { apiPublicUrl } from "@/constants";
import { createBookmarkApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const bookmarkApi = createBookmarkApi(apiPublicUrl);

export const { useGetUserLastReadBookmarkQuery, useUpdateBookmarkMutation } =
  bookmarkApi;
