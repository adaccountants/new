import { clearAdminSession, persistAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase-client";

export const ADMIN_LOGIN_ERROR = "Invalid email or password";
const MIN_FAILURE_MS = 700;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function padFailure(started: number) {
  const elapsed = Date.now() - started;
  if (elapsed < MIN_FAILURE_MS) await sleep(MIN_FAILURE_MS - elapsed);
}

async function failLogin(started: number): Promise<never> {
  await padFailure(started);
  throw new Error(ADMIN_LOGIN_ERROR);
}

async function syncSessionCookies() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token || !session.refresh_token) return;
  await persistAdminSession({
    data: {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    },
  });
}

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
  const started = Date.now();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    const user = data.user;
    if (error || !user) {
      return await failLogin(started);
    }
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      return await failLogin(started);
    }

    await syncSessionCookies();
    return user;
  } catch (error) {
    if (error instanceof Error && error.message === ADMIN_LOGIN_ERROR) throw error;
    return await failLogin(started);
  }
}

export async function signOutAdmin() {
  try {
    await clearAdminSession();
  } catch (error) {
    console.error("[admin] failed to clear server session cookies", error);
  }
  await supabase.auth.signOut();
}
