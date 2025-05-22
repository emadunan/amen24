import { apiPublicUrl } from "@/constants";
import { createGlossaryApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const glossaryApi = createGlossaryApi(apiPublicUrl);

export const { useAddGlossaryTermMutation } = glossaryApi;
