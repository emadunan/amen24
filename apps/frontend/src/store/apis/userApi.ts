import { apiPublicUrl } from "@/constants";
import { createUserApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const userApi = createUserApi(apiPublicUrl);

export const {
  useSignupMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
  useResetPasswordMutation,
  useRequestPasswordMutation,
  useRestorePasswordMutation,
} = userApi;
