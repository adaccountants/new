export type StorageBucket = "card-images" | "knowledge-files";

const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const PDF_MIME_TYPE = "application/pdf";
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const PDF_MAX_BYTES = 15 * 1024 * 1024;

const PNG_SIG = [0x89, 0x50, 0x4e, 0x47];
const JPEG_SIG = [0xff, 0xd8, 0xff];
const PDF_SIG = [0x25, 0x50, 0x44, 0x46]; // %PDF
const RIFF_SIG = [0x52, 0x49, 0x46, 0x46];
const WEBP_SIG = [0x57, 0x45, 0x42, 0x50];

type UploadFile = Pick<File, "type" | "size" | "name">;

function bytesStartWith(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) return false;
  return signature.every((value, index) => bytes[index] === value);
}

/** MIME type implied by magic bytes, or null if the contents are not an allowed image/PDF. */
export function sniffUploadMime(bytes: Uint8Array): string | null {
  if (bytesStartWith(bytes, PNG_SIG)) return "image/png";
  if (bytesStartWith(bytes, JPEG_SIG)) return "image/jpeg";
  if (
    bytes.length >= 12 &&
    bytesStartWith(bytes, RIFF_SIG) &&
    bytes[8] === WEBP_SIG[0] &&
    bytes[9] === WEBP_SIG[1] &&
    bytes[10] === WEBP_SIG[2] &&
    bytes[11] === WEBP_SIG[3]
  ) {
    return "image/webp";
  }
  if (bytesStartWith(bytes, PDF_SIG)) return PDF_MIME_TYPE;
  return null;
}

export function assertFileSignature(bucket: StorageBucket, claimedType: string, bytes: Uint8Array): void {
  const sniffed = sniffUploadMime(bytes);
  const imageError = "Please upload a PNG, JPEG, or WebP image.";
  const pdfError = "Please upload a PDF file.";
  if (!sniffed) {
    throw new Error(bucket === "knowledge-files" ? pdfError : imageError);
  }
  if (sniffed !== claimedType) {
    throw new Error("The file contents do not match the selected file type.");
  }
  if (bucket === "card-images" && !IMAGE_MIME_TYPES.has(sniffed)) {
    throw new Error(imageError);
  }
  if (bucket === "knowledge-files" && sniffed !== PDF_MIME_TYPE) {
    throw new Error(pdfError);
  }
}

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
