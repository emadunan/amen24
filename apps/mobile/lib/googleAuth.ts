import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Ensure it only completes once per app lifecycle
WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectUri = Linking.createURL('auth-callback');
  const state = encodeURIComponent(JSON.stringify({
    mobile: true,
    redirectUri
  }))

  const authUrl = `https://test.amen24.org/api/auth/google?state=${state}`;

  try {
    await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    // WebBrowser will close automatically after backend redirects to amen24://...
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
