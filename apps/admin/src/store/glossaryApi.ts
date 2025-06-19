import { createGlossaryApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const glossaryApi = createGlossaryApi(apiUrl);

export const {
  useGenerateAiDefinitionMutation,
  useUpdateTranslationMutation,
  useUpdateTermMutation,
  useDeleteTermMutation,
  useLazyGetAllTermsQuery,
  useGetOneTermQuery,
} = glossaryApi;
