import { apiPublicUrl } from "@/constants";
import { createProgressApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const progressApi = createProgressApi(apiPublicUrl);

export const { useGetUserLastReadProgressQuery, useUpdateProgressMutation } = progressApi;