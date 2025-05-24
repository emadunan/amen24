import { createGlossaryApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const glossaryApi = createGlossaryApi(apiUrl);

export const {
  useUpdateTranslationMutation,
  useAddGlossaryTermMutation,
  useCheckTermByTitleQuery,
  useUpdateTermMutation,
  useGetAllTermsQuery,
  useGetOneTermQuery,
} = glossaryApi;
