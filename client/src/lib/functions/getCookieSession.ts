import { headers, cookies } from "next/headers";

/**
 * Retrieves the session cookie from the server environment. Only call in server-side code.
 */
export function getCookieSession() {
  const cookieStore = cookies();
  const cookieName = "session";
  const cookieSession = cookieStore.get(cookieName);
  return cookieSession ?? null;
}
