import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUri = Linking.createURL('auth-callback');
  const state = encodeURIComponent(JSON.stringify({
    mobile: true,
    redirectUri
  }));
  const authUrl = `https://test.amen24.org/api/auth/google/mobile`;

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
  return result.type === "success" ? { success: true } : { success: false };
}
