import { createServerFn } from "@tanstack/react-start";

import { assertFileSignature, assertUploadAllowed, type StorageBucket } from "@/lib/file-signature";
import { supabase } from "@/lib/supabase-client";

export type { StorageBucket } from "@/lib/file-signature";
export { assertFileSignature, assertUploadAllowed } from "@/lib/file-signature";

const SIGNATURE_BYTES = 16;

type SignaturePayload = {
  bucket: StorageBucket;
  type: string;
  size: number;
  name: string;
  header: number[];
};

/**
 * Server-side magic-byte check. The browser `file.type` is only a first-pass UX
 * filter; this is the security boundary before the client talks to Storage.
 */
export const validateUploadSignature = createServerFn({ method: "POST" })
  .validator((input: unknown): SignaturePayload => {
    if (!input || typeof input !== "object") {
      throw new Error("Invalid upload");
    }
    const data = input as Record<string, unknown>;
    const bucket = data["bucket"];
    const type = data["type"];
    const size = data["size"];
    const name = data["name"];
    const header = data["header"];
    if (bucket !== "card-images" && bucket !== "knowledge-files") {
      throw new Error("Invalid upload");
    }
    if (typeof type !== "string" || typeof name !== "string") {
      throw new Error("Invalid upload");
    }
    if (typeof size !== "number" || !Number.isFinite(size) || size < 0) {
      throw new Error("Invalid upload");
    }
    if (!Array.isArray(header) || header.length < 4 || header.length > 64) {
      throw new Error("Invalid upload");
    }
    if (
      !header.every(
        (byte) => typeof byte === "number" && Number.isInteger(byte) && byte >= 0 && byte <= 255,
      )
    ) {
      throw new Error("Invalid upload");
    }
    return { bucket, type, size, name, header: header as number[] };
  })
  .handler(async ({ data }) => {
    const { getAdminUserFromRequest } = await import("@/lib/admin-session.server");
    const admin = await getAdminUserFromRequest();
    if (!admin) throw new Error("Unauthorized");

    const bytes = Uint8Array.from(data.header);
    assertFileSignature(data.bucket, data.type, bytes);
    assertUploadAllowed(data.bucket, { type: data.type, size: data.size, name: data.name });
    return { ok: true as const };
  });

export async function uploadPublicFile(bucket: StorageBucket, file: File): Promise<string> {
  assertUploadAllowed(bucket, file);

  const header = Array.from(new Uint8Array(await file.slice(0, SIGNATURE_BYTES).arrayBuffer()));
  await validateUploadSignature({
    data: {
      bucket,
      type: file.type,
      size: file.size,
      name: file.name,
      header,
    },
  });

  const safeName = file.name.replace(/[^\w.-]+/g, "_");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  if (bucket === "knowledge-files") {
    return path;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
