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

export function getServiceSupabase(): SupabaseClient {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  if (!client) {
    client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
