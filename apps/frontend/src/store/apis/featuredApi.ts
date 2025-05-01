import { apiPublicUrl } from "@/constants";
import { createFeaturedApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const featuredApi = createFeaturedApi(apiPublicUrl);

export const {
  useGetAllFeaturedQuery,
  useGetFeaturedTextQuery,
  useAddToFeaturedMutation,
  useRemoveFromFeaturedMutation,
} = featuredApi;
