import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase-client";

/**
 * Public loaders run on the server without a user session.
 * Use the service role there so reads are not blocked by RLS policies
 * that accidentally query `public.admins` as the `anon` role.
 *
 * Browser calls keep the anon/authenticated client (admin writes + Storage).
 */
export async function getCmsDb(): Promise<SupabaseClient> {
  if (import.meta.env.SSR) {
    try {
      const { getServiceSupabase } = await import("@/lib/supabase-server");
      const service = getServiceSupabase();
      if (service) return service;
    } catch (error) {
      console.error("[cms] service role client failed, using anon", error);
    }
  }
  return supabase;
}
