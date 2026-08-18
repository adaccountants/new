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

function throwIfError(error: { message: string } | null, action: string) {
  if (error) throw new Error(`${action}: ${error.message}`);
}

export async function markContactSubmissionHandled(id: string): Promise<void> {
  const { error } = await supabase.from("contact_submissions").update({ status: "handled" }).eq("id", id);
  throwIfError(error, "markContactSubmissionHandled");
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  throwIfError(error, "deleteContactSubmission");
}
