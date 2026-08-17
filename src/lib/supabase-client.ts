import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

const isBrowser = typeof window !== "undefined";

/**
 * Browser: cookie-backed session (@supabase/ssr) so SSR beforeLoad can
 * read the same session from request cookies.
 * Server: unauthenticated anon client for public CMS reads (no session).
 */
export const supabase = isBrowser
  ? createBrowserClient(url, anonKey)
  : createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
