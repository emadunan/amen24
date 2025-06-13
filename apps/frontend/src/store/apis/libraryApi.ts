import { apiPublicUrl } from "@/constants";
import { createLibraryApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const libraryApi = createLibraryApi(apiPublicUrl);

export const {
  useGetLibraryBookQuery,
  useGetLibraryBooksQuery,
  useGetLibraryChapterQuery,
} = libraryApi;
