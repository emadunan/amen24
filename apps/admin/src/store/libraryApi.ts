import { createLibraryApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const libraryApi = createLibraryApi(apiUrl);

export const { useGetLibraryBooksQuery, useCreateLibraryBookMutation, useCreateLibraryChapterMutation, useGetLibraryBookQuery } =
  libraryApi;
