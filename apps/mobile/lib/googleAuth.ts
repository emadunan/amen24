import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUri = Linking.createURL('auth-callback');
  const authUrl = `https://test.amen24.org/api/auth/google/mobile`;

  console.log(authUrl);
  

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
  return result.type === "success" ? { success: true } : { success: false };
}
