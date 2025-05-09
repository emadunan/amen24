import { apiPublicUrl } from "@/constants";
import { createProfileApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const profileApi = createProfileApi(apiPublicUrl);

export const { useUpdateProfileMutation, useDeleteAccountMutation } =
  profileApi;
