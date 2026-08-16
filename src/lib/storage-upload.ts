import { supabase } from "@/lib/supabase-client";

export type StorageBucket = "card-images" | "knowledge-files";

export async function uploadPublicFile(bucket: StorageBucket, file: File): Promise<string> {
  const safeName = file.name.replace(/[^\w.-]+/g, "_");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
