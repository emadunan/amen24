import * as SecureStore from 'expo-secure-store';

export async function setTokens(accessToken: string, refreshToken: string) {
  await SecureStore.setItemAsync('accessToken', accessToken);
  await SecureStore.setItemAsync('refreshToken', refreshToken);
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync('accessToken');
}

export const logout = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};
