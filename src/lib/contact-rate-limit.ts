export const CONTACT_RATE_LIMIT_MAX = 3;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many messages from this connection. Please wait a few minutes and try again.";

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

export function getClientIpFromHeaders(headers: {
  get(name: string): string | null | undefined;
}): string {
  const forwarded = headers.get("x-forwarded-for") ?? headers.get("X-Forwarded-For");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip") ?? headers.get("X-Real-IP");
  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}
