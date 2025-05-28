import { createFeaturedApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const featuredApi = createFeaturedApi(apiUrl);
export const { useGetAllFeaturedQuery, useGetFeaturedTextQuery, useUpdateFeaturedTextMutation, useUpdateFeaturedMutation } = featuredApi; 
