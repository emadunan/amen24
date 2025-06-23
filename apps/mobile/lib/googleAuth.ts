import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { apiUrl } from "@/constants";

// Ensure this runs once per app lifecycle
WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUri = Linking.createURL("bible"); // e.g., amen24://redirect
  const authUrl = `https://amen24.org/api/auth/google`;

  try {
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    if (result.type === "success" && result.url) {
      const parsed = Linking.parse(result.url);
      const token = parsed.queryParams?.token;

      if (token) {
        console.log("Token:", token);
        return { success: true, token };
      }
    }

    return { success: false };
  } catch (err) {
    console.error("OAuth error", err);
    return { success: false, error: err };
  }
}
