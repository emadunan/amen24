import { apiPublicUrl } from "@/constants";
import { createVerseApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const verseApi = createVerseApi(apiPublicUrl);

export const { useGetVerseGroupsQuery, useGetVerseByIdQuery } = verseApi;
