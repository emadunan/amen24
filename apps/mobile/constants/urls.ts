import Constants from "expo-constants";

console.log("Loaded BASE_URL:", Constants.expoConfig?.extra);

export const apiUrl = Constants.expoConfig?.extra?.API_URL;
export const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
