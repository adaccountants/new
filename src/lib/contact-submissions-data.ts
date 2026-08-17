import { getCmsDb } from "@/lib/cms-db";
import { supabase } from "@/lib/supabase-client";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: string;
};

type SubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};

function throwIfError(error: { message: string } | null, action: string) {
  if (error) throw new Error(`${action}: ${error.message}`);
}

function logIfError(error: { message: string } | null, action: string) {
  if (error) console.error(`[supabase] ${action}:`, error.message);
  return Boolean(error);
}

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

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getCmsDb();
  const { data, error } = await db
    .from("contact_submissions")
    .select("id, name, email, phone, message, status, created_at")
    .order("created_at", { ascending: false });
  if (logIfError(error, "listContactSubmissions")) return [];
  return ((data ?? []) as SubmissionRow[]).map(fromRow);
}

export async function markContactSubmissionHandled(id: string): Promise<void> {
  const { error } = await supabase.from("contact_submissions").update({ status: "handled" }).eq("id", id);
  throwIfError(error, "markContactSubmissionHandled");
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  throwIfError(error, "deleteContactSubmission");
}
