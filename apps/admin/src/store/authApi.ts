import { createAuthApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const authApi = createAuthApi(apiUrl);
export const { useGetMeQuery, useLoginMutation } = authApi;
