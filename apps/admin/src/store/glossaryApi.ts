import { createGlossaryApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const glossaryApi = createGlossaryApi(apiUrl);

export const { useAddGlossaryTermMutation, useCheckTermByTitleQuery, useGetAllTermsQuery } = glossaryApi;
