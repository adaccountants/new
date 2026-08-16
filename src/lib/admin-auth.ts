import { supabase } from "@/lib/supabase-client";

export async function getAdminUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error || !data) return null;
  return session.user;
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const user = data.user;
  if (!user) throw new Error("Sign-in failed");

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    throw new Error("This account is not an admin");
  }

  return user;
}

export async function signOutAdmin() {
  await supabase.auth.signOut();
}
