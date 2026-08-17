import { createServerFn } from "@tanstack/react-start";

export type AdminSessionUser = { id: string; email: string };

export const getServerAdminUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminSessionUser | null> => {
    const { getAdminUserFromRequest } = await import("@/lib/admin-session.server");
    return getAdminUserFromRequest();
  },
);

export const persistAdminSession = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") {
      throw new Error("Invalid session");
    }
    const data = input as Record<string, unknown>;
    const accessToken = data["accessToken"];
    const refreshToken = data["refreshToken"];
    if (typeof accessToken !== "string" || accessToken.length === 0) {
      throw new Error("Invalid session");
    }
    if (typeof refreshToken !== "string" || refreshToken.length === 0) {
      throw new Error("Invalid session");
    }
    return { accessToken, refreshToken };
  })
  .handler(async ({ data }) => {
    const { persistAdminSessionCookies } = await import("@/lib/admin-session.server");
    await persistAdminSessionCookies(data);
    return { ok: true as const };
  });

export const clearAdminSession = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminSessionCookies } = await import("@/lib/admin-session.server");
  await clearAdminSessionCookies();
  return { ok: true as const };
});
