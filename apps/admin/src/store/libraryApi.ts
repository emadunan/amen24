import { createLibraryApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const libraryApi = createLibraryApi(apiUrl);

export const {
  useGetLibraryBookQuery,
  useGetLibraryBooksQuery,
  useGetLibraryChapterQuery,
  useGetLibraryChapterNextOrderQuery,
  useChangeLibraryChapterOrderMutation,
  useCreateLibraryBookMutation,
  useCreateLibraryChapterMutation,
  useUpdateLibraryChapterMutation,
  useDeleteLibraryBookMutation,
  useDeleteLibraryChapterMutation,
} = libraryApi;
