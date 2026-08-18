const SAFE_PREFIXES = ["https://", "http://", "mailto:", "tel:"] as const;

export const UNSAFE_URL_MESSAGE =
  "Enter a valid http://, https://, mailto:, or tel: URL. Other schemes are not allowed.";

/**
 * True only for http(s), mailto, and tel URLs.
 * Rejects javascript:, data:, vbscript:, protocol-relative, and anything else.
 */
export function isSafeExternalUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  return SAFE_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

export function warnUnsafeUrl(url: string): void {
  console.warn("[safe-url] blocked unsafe href", url);
}

/** Same-origin path such as `/knowledge-files/guide.pdf`. Not `//evil.com`. */
export function isSafeRelativeUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("\\");
}

/**
 * Admin-editable asset/link field: empty, same-origin path, or a safe external URL.
 * Storage object keys (no scheme, no leading slash) are allowed for knowledge files.
 */
export function isSafeAdminUrl(url: string, opts?: { allowStoragePath?: boolean }): boolean {
  const trimmed = url.trim();
  if (!trimmed) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return isSafeExternalUrl(trimmed);
  if (isSafeRelativeUrl(trimmed)) return true;
  if (opts?.allowStoragePath && !trimmed.includes("://")) return true;
  return false;
}

export function toSafeHref(url: string | undefined | null): string | undefined {
  const trimmed = url?.trim() ?? "";
  if (!trimmed) return undefined;
  if (isSafeExternalUrl(trimmed)) return trimmed;
  warnUnsafeUrl(trimmed);
  return undefined;
}

export function toSafeDownloadHref(url: string | undefined | null): string | undefined {
  const trimmed = url?.trim() ?? "";
  if (!trimmed) return undefined;
  if (isSafeExternalUrl(trimmed) || isSafeRelativeUrl(trimmed)) return trimmed;
  warnUnsafeUrl(trimmed);
  return undefined;
}
