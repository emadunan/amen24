// ui/utils/fetchWithReauth.ts
import { ERROR_KEYS } from "@amen24/shared";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

/**
 * Fetch wrapper that automatically retries the request
 * after refreshing the access token if the session is expired.
 *
 * @param input RequestInfo - URL or Request object
 * @param init RequestInit - fetch options
 * @returns Response
 */
export async function fetchWithReauth(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const doFetch = () =>
    fetch(input, {
      credentials: "include",
      ...init,
    });

  let response = await doFetch();

  // If 401 and not locked (only handle expected auth errors)
  if (response.status === 401 && !mutex.isLocked()) {
    const errorData = await response
      .clone()
      .json()
      .catch(() => null);
    const message = errorData?.message;

    if (
      message === ERROR_KEYS.SESSION_NOT_EXIST ||
      message === ERROR_KEYS.SESSION_EXPIRED
    ) {
      const release = await mutex.acquire();
      try {
        const refreshRes = await fetch("/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          response = await doFetch(); // Retry original request
        } else {
          console.warn("[fetchWithReauth] Refresh failed");
        }
      } finally {
        release();
      }
    }
  } else if (response.status === 401 && mutex.isLocked()) {
    // Wait for another refresh to complete
    await mutex.waitForUnlock();
    response = await doFetch();
  }

  return response;
}
