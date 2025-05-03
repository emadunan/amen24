import { createProfileApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const profileApi = createProfileApi(apiUrl);

export const { useGetProfileStatisticsQuery, useGetProfilesQuery, useUpdateUserProfileMutation } = profileApi;
