import { createServerFn } from "@tanstack/react-start";

import type { ContactSubmission } from "@/lib/contact-submissions-data";

type SubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};

function fromRow(row: SubmissionRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

/**
 * Admin inbox read: cookie-scoped user client (RLS), never the service role.
 */
export const listContactSubmissions = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContactSubmission[]> => {
    const { getRequestSupabase } = await import("@/lib/admin-session.server");
    const db = getRequestSupabase();
    const { data, error } = await db
      .from("contact_submissions")
      .select("id, name, email, phone, message, status, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[supabase] listContactSubmissions:", error.message);
      return [];
    }
    return ((data ?? []) as SubmissionRow[]).map(fromRow);
  },
);
