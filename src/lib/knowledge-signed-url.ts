import { createServerFn } from "@tanstack/react-start";

import { knowledgeObjectPath, KNOWLEDGE_FILES_BUCKET } from "@/lib/knowledge-file-url";

const SIGNED_URL_TTL_SECONDS = 60 * 60;

/**
 * Short-lived download URLs for private knowledge-files objects.
 * Service role is required: anon has no SELECT on the private bucket.
 */
export const signKnowledgeFileUrls = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!Array.isArray(input)) {
      throw new Error("Invalid file list");
    }
    const paths = [
      ...new Set(
        input
          .filter((value): value is string => typeof value === "string")
          .map((value) => knowledgeObjectPath(value))
          .filter((value): value is string => Boolean(value)),
      ),
    ];
    return paths;
  })
  .handler(async ({ data: paths }): Promise<Record<string, string>> => {
    if (paths.length === 0) return {};
    const { getServiceSupabase } = await import("@/lib/supabase-server");
    const db = getServiceSupabase();
    if (!db) return {};

    const signed: Record<string, string> = {};
    await Promise.all(
      paths.map(async (path) => {
        const { data, error } = await db.storage
          .from(KNOWLEDGE_FILES_BUCKET)
          .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
        if (error || !data?.signedUrl) {
          console.error("[knowledge] createSignedUrl failed", path, error?.message);
          return;
        }
        signed[path] = data.signedUrl;
      }),
    );
    return signed;
  });
