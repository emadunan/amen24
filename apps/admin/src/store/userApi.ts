import { createUserApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const userApi = createUserApi(apiUrl);

export const { useGetProfileStatisticsQuery, useGetProfilesQuery, useUpdateUserProfileMutation } = userApi;