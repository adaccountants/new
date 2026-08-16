import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 * Never import this file from a client component — only inside
 * server functions (createServerFn) or other server-only modules.
 */
if (typeof window !== "undefined") {
  throw new Error("supabase-server.ts must never be imported in the browser");
}

let client: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const env = process.env;
  const serviceRoleKey = env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) {
    console.error("[cms] SUPABASE_SERVICE_ROLE_KEY is not available on the server");
    return null;
  }
  if (!client) {
    client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
