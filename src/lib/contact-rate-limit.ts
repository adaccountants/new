export const CONTACT_RATE_LIMIT_MAX = 3;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many messages from this connection. Please wait a few minutes and try again.";

/** Shared bucket when no platform-trusted IP is present (fail closed, not unlimited). */
export const CONTACT_RATE_LIMIT_UNKNOWN_IP = "unknown";

const recentByIp = new Map<string, number[]>();

export function pruneTimestamps(timestamps: number[], now: number): number[] {
  const cutoff = now - CONTACT_RATE_LIMIT_WINDOW_MS;
  return timestamps.filter((time) => time > cutoff);
}

export function memoryRateLimitWouldExceed(ip: string, now = Date.now()): boolean {
  return pruneTimestamps(recentByIp.get(ip) ?? [], now).length >= CONTACT_RATE_LIMIT_MAX;
}

export function memoryRateLimitRecord(ip: string, now = Date.now()): void {
  const next = pruneTimestamps(recentByIp.get(ip) ?? [], now);
  next.push(now);
  recentByIp.set(ip, next);
}

export function memoryRateLimitReset(): void {
  recentByIp.clear();
}

function firstHop(value: string | null | undefined): string | null {
  const first = value?.split(",")[0]?.trim();
  return first || null;
}

/**
 * Client IP for rate limiting.
 *
 * On Vercel, `x-vercel-forwarded-for` is platform-injected and is not replaced
 * when a client or outer proxy sends `X-Forwarded-For`. `x-real-ip` is Vercel's
 * single-IP equivalent. Generic `X-Forwarded-For` is never trusted.
 * CAPTCHA/Turnstile is a recommended follow-up; this helper only fixes IP trust.
 *
 * https://vercel.com/docs/headers/request-headers
 */
export function getClientIpFromHeaders(headers: {
  get(name: string): string | null | undefined;
}): string {
  const vercelForwarded = firstHop(
    headers.get("x-vercel-forwarded-for") ?? headers.get("X-Vercel-Forwarded-For"),
  );
  if (vercelForwarded) return vercelForwarded;

  const realIp = firstHop(headers.get("x-real-ip") ?? headers.get("X-Real-IP"));
  if (realIp) return realIp;

  return CONTACT_RATE_LIMIT_UNKNOWN_IP;
}
