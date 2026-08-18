export const KNOWLEDGE_FILES_BUCKET = "knowledge-files";

const PATH_MARKERS = [
  "/storage/v1/object/public/knowledge-files/",
  "/storage/v1/object/sign/knowledge-files/",
  "/storage/v1/object/authenticated/knowledge-files/",
];

const UPLOADED_OBJECT_PREFIX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i;

/**
 * Object path inside the Supabase knowledge-files bucket.
 * Site-relative files such as /knowledge-files/guide.pdf stay unparsed
 * (they are served from public/, not Storage).
 */
export function knowledgeObjectPath(fileUrl: string | undefined): string | null {
  const trimmed = fileUrl?.trim() ?? "";
  if (!trimmed) return null;

  for (const marker of PATH_MARKERS) {
    const index = trimmed.indexOf(marker);
    if (index >= 0) {
      const rest = trimmed.slice(index + marker.length).split("?")[0];
      if (!rest) return null;
      try {
        return decodeURIComponent(rest);
      } catch {
        return rest;
      }
    }
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return null;

  const path = trimmed.replace(/^\/+/, "").replace(/^knowledge-files\//, "");
  if (!path || !UPLOADED_OBJECT_PREFIX.test(path)) return null;
  return path;
}
