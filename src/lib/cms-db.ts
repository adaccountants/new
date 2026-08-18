import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase-client";

/**
 * CMS reads for public pages and shared loaders.
 *
 * Always the anon (browser) / unauthenticated server anon client so Row Level
 * Security applies: published cards only, public page_content and site_settings.
 * Do not use the service-role client here — it bypasses RLS.
 *
 * Admin writes keep using the authenticated browser client in cards-data /
 * page-content-data / site-settings-data. Inbox reads use the request-scoped
 * cookie client in contact-submissions-data, not this helper.
 */
export async function getCmsDb(): Promise<SupabaseClient> {
  return supabase;
}
