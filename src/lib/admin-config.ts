/**
 * TEMP placeholder auth — NOT secure, replace with real Supabase Auth + RLS
 * before this goes live for a client.
 *
 * The password is a client-side constant. A matching sessionStorage flag is
 * the only gate on /admin. Anyone can read this file in the bundled JS.
 */

export const ADMIN_PASSWORD = "alphadigi";
export const ADMIN_SESSION_KEY = "ada-admin-authed";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function setAdminAuthed(authed: boolean): void {
  if (typeof window === "undefined") return;
  if (authed) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}
