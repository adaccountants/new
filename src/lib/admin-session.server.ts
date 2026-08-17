import { createServerClient, type CookieOptions } from "@supabase/ssr";
import {
  getCookies,
  getRequestProtocol,
  setCookie,
  setResponseHeader,
} from "@tanstack/react-start/server";

if (typeof window !== "undefined") {
  throw new Error("admin-session.server.ts must never be imported in the browser");
}

export type AdminSessionUser = { id: string; email: string };

function envValue(name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY"): string {
  const fromImportMeta = import.meta.env[name];
  if (typeof fromImportMeta === "string" && fromImportMeta.trim()) return fromImportMeta.trim();
  return (process.env[name] ?? "").trim();
}

function createSupabaseRequestClient() {
  const url = envValue("VITE_SUPABASE_URL");
  const anonKey = envValue("VITE_SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }

  return createServerClient(url, anonKey, {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      secure: getRequestProtocol() === "https",
    },
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({ name, value }));
      },
      setAll(cookiesToSet, headers) {
        for (const cookie of cookiesToSet) {
          setCookie(cookie.name, cookie.value, serializeCookieOptions(cookie.options));
        }
        for (const [name, value] of Object.entries(headers)) {
          setResponseHeader(name, value);
        }
      },
    },
  });
}

function serializeCookieOptions(options: CookieOptions) {
  return {
    ...(options.path != null ? { path: options.path } : {}),
    ...(options.domain != null ? { domain: options.domain } : {}),
    ...(options.maxAge != null ? { maxAge: options.maxAge } : {}),
    ...(options.expires != null ? { expires: options.expires } : {}),
    ...(options.httpOnly != null ? { httpOnly: options.httpOnly } : {}),
    ...(options.secure != null ? { secure: options.secure } : {}),
    ...(options.sameSite != null && options.sameSite !== false
      ? { sameSite: options.sameSite === true ? ("strict" as const) : options.sameSite }
      : {}),
  };
}

/**
 * Verifies the request's Supabase cookies with Auth (getUser, not getSession)
 * and confirms the user is in public.admins — same membership check as getAdminUser().
 */
export async function getAdminUserFromRequest(): Promise<AdminSessionUser | null> {
  const supabase = createSupabaseRequestClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (adminError || !admin) return null;
  return { id: user.id, email: user.email ?? "" };
}

export async function persistAdminSessionCookies(tokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<void> {
  const supabase = createSupabaseRequestClient();
  const { error } = await supabase.auth.setSession({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });
  if (error) throw error;
}

export async function clearAdminSessionCookies(): Promise<void> {
  const supabase = createSupabaseRequestClient();
  await supabase.auth.signOut();
}
