import { apiUrl } from "@/constants";
import { createProfileApi } from "@amen24/store";

if (!apiUrl) throw new Error("Api url must be defined!");

export const profileApi = createProfileApi(apiUrl);

export const { useUpdateProfileMutation, useDeleteAccountMutation } =
  profileApi;
