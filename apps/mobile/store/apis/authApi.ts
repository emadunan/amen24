import { apiUrl } from "@/constants";
import { createAuthApi } from "@amen24/ui";

if (!apiUrl) throw new Error("Api url must be defined!");

export const authApi = createAuthApi(apiUrl);
export const { useGetMeQuery, useLoginMutation } = authApi;
