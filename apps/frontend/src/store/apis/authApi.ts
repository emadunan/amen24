import { apiPublicUrl } from "@/constants";
import { createAuthApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const authApi = createAuthApi(apiPublicUrl);

export const { useGetMeQuery, useLoginMutation } = authApi;