import { supabase } from "@/lib/supabase-client";

export type StorageBucket = "card-images" | "knowledge-files";

const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const PDF_MIME_TYPE = "application/pdf";
const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const PDF_MAX_BYTES = 15 * 1024 * 1024;

type UploadFile = Pick<File, "type" | "size" | "name">;

export function assertUploadAllowed(bucket: StorageBucket, file: UploadFile): void {
  if (bucket === "card-images") {
    if (!IMAGE_MIME_TYPES.has(file.type)) {
      throw new Error("Please upload a PNG, JPEG, or WebP image.");
    }
    if (file.size > IMAGE_MAX_BYTES) {
      throw new Error("Images must be 5MB or smaller.");
    }
    return;
  }

  if (file.type !== PDF_MIME_TYPE) {
    throw new Error("Please upload a PDF file.");
  }
  if (file.size > PDF_MAX_BYTES) {
    throw new Error("PDFs must be 15MB or smaller.");
  }
}

export async function uploadPublicFile(bucket: StorageBucket, file: File): Promise<string> {
  assertUploadAllowed(bucket, file);

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
