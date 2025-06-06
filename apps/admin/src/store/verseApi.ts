import { createVerseApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const verseApi = createVerseApi(apiUrl);

export const { useGetVerseGroupsQuery } = verseApi;
