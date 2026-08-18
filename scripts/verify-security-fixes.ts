import {
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_MESSAGE,
  CONTACT_RATE_LIMIT_UNKNOWN_IP,
  getClientIpFromHeaders,
  memoryRateLimitRecord,
  memoryRateLimitReset,
  memoryRateLimitWouldExceed,
} from "../src/lib/contact-rate-limit.ts";
import { knowledgeObjectPath } from "../src/lib/knowledge-file-url.ts";
import { assertFileSignature, assertUploadAllowed } from "../src/lib/file-signature.ts";
import { isSafeExternalUrl } from "../src/lib/safe-url.ts";

function headers(map: Record<string, string>) {
  return {
    get(name: string) {
      return map[name] ?? map[name.toLowerCase()] ?? null;
    },
  };
}

function expect(cond: boolean, message: string) {
  if (!cond) throw new Error(message);
}

memoryRateLimitReset();
const ip = "203.0.113.10";
const results: boolean[] = [];
for (let i = 0; i < 5; i++) {
  const blocked = memoryRateLimitWouldExceed(ip);
  results.push(!blocked);
  if (!blocked) memoryRateLimitRecord(ip);
}
expect(
  results.filter(Boolean).length === CONTACT_RATE_LIMIT_MAX,
  `expected ${CONTACT_RATE_LIMIT_MAX} allowed, got ${results.filter(Boolean).length}`,
);
expect(
  results.slice(CONTACT_RATE_LIMIT_MAX).every((ok) => !ok),
  "later attempts should be blocked",
);
expect(CONTACT_RATE_LIMIT_MESSAGE.includes("few minutes"), "friendly error message");

expect(
  getClientIpFromHeaders(headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" })) ===
    CONTACT_RATE_LIMIT_UNKNOWN_IP,
  "generic X-Forwarded-For must not be trusted",
);
expect(
  getClientIpFromHeaders(
    headers({
      "x-forwarded-for": "198.51.100.1",
      "x-vercel-forwarded-for": "203.0.113.10",
    }),
  ) === "203.0.113.10",
  "x-vercel-forwarded-for wins over spoofed X-Forwarded-For",
);
expect(
  getClientIpFromHeaders(
    headers({
      "x-forwarded-for": "198.51.100.2",
      "x-vercel-forwarded-for": "203.0.113.10",
    }),
  ) === "203.0.113.10",
  "different fake XFF still maps to the same Vercel IP",
);
expect(
  getClientIpFromHeaders(headers({ "x-real-ip": "203.0.113.11" })) === "203.0.113.11",
  "x-real-ip is used when the Vercel header is absent",
);

memoryRateLimitReset();
const spoofA = getClientIpFromHeaders(
  headers({ "x-forwarded-for": "1.1.1.1", "x-vercel-forwarded-for": "203.0.113.10" }),
);
const spoofB = getClientIpFromHeaders(
  headers({ "x-forwarded-for": "8.8.8.8", "x-vercel-forwarded-for": "203.0.113.10" }),
);
expect(spoofA === spoofB, "spoofed XFF values must share one bucket");
for (let i = 0; i < CONTACT_RATE_LIMIT_MAX; i++) {
  expect(!memoryRateLimitWouldExceed(spoofA), "trusted IP still allowed before the cap");
  memoryRateLimitRecord(spoofA);
}
expect(memoryRateLimitWouldExceed(spoofB), "same trusted IP is limited even with a new fake XFF");

expect(
  knowledgeObjectPath(
    "https://example.supabase.co/storage/v1/object/public/knowledge-files/abc-guide.pdf",
  ) === "abc-guide.pdf",
  "public knowledge URL parses to object path",
);
expect(
  knowledgeObjectPath("11111111-1111-1111-1111-111111111111-guide.pdf") ===
    "11111111-1111-1111-1111-111111111111-guide.pdf",
  "uploaded object path is kept",
);
expect(
  knowledgeObjectPath("/knowledge-files/abc-guide.pdf") === null,
  "static public/ PDF is not a storage object",
);
expect(
  knowledgeObjectPath("https://example.com/file.pdf") === null,
  "external URL is not a bucket path",
);

const html = { type: "text/html", size: 100, name: "xss.html" };
const svg = { type: "image/svg+xml", size: 100, name: "logo.svg" };
const png = { type: "image/png", size: 100, name: "logo.png" };
const pdf = { type: "application/pdf", size: 100, name: "guide.pdf" };

let htmlRejected = false;
try {
  assertUploadAllowed("card-images", html);
} catch (error) {
  htmlRejected = error instanceof Error && error.message.includes("PNG");
}
expect(htmlRejected, "html image upload should be rejected");

let svgRejected = false;
try {
  assertUploadAllowed("card-images", svg);
} catch (error) {
  svgRejected = error instanceof Error && error.message.includes("PNG");
}
expect(svgRejected, "svg image upload should be rejected");

assertUploadAllowed("card-images", png);
assertUploadAllowed("knowledge-files", pdf);

let htmlPdfRejected = false;
try {
  assertUploadAllowed("knowledge-files", html);
} catch (error) {
  htmlPdfRejected = error instanceof Error && error.message.includes("PDF");
}
expect(htmlPdfRejected, "html knowledge upload should be rejected");

const pngBytes = Uint8Array.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0, 0, 0, 0, 0,
]);
const jpegBytes = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const webpBytes = Uint8Array.from([
  0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 0, 0, 0, 0,
]);
const pdfBytes = Uint8Array.from([
  0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0, 0, 0, 0, 0, 0, 0, 0,
]);
const htmlBytes = Uint8Array.from(Array.from("<!doctype html>", (ch) => ch.charCodeAt(0)));

assertFileSignature("card-images", "image/png", pngBytes);
assertFileSignature("card-images", "image/jpeg", jpegBytes);
assertFileSignature("card-images", "image/webp", webpBytes);
assertFileSignature("knowledge-files", "application/pdf", pdfBytes);

let spoofedRejected = false;
try {
  assertFileSignature("card-images", "image/png", htmlBytes);
} catch (error) {
  spoofedRejected = error instanceof Error;
}
expect(spoofedRejected, "html bytes claimed as png should be rejected");

let mismatchRejected = false;
try {
  assertFileSignature("card-images", "image/png", jpegBytes);
} catch (error) {
  mismatchRejected = error instanceof Error && error.message.includes("do not match");
}
expect(mismatchRejected, "jpeg bytes claimed as png should be rejected");

let pdfAsImageRejected = false;
try {
  assertFileSignature("card-images", "image/png", pdfBytes);
} catch (error) {
  pdfAsImageRejected = error instanceof Error;
}
expect(pdfAsImageRejected, "pdf bytes should not be accepted as a card image");

expect(isSafeExternalUrl("https://example.com"), "https is allowed");
expect(isSafeExternalUrl("http://example.com"), "http is allowed");
expect(isSafeExternalUrl("mailto:hi@example.com"), "mailto is allowed");
expect(isSafeExternalUrl("tel:+441234"), "tel is allowed");
expect(!isSafeExternalUrl("javascript:alert(1)"), "javascript: is blocked");
expect(!isSafeExternalUrl("data:text/html,hi"), "data: is blocked");
expect(!isSafeExternalUrl("vbscript:msgbox"), "vbscript: is blocked");
expect(!isSafeExternalUrl("//evil.example"), "protocol-relative is blocked");

console.log("security helper checks passed");
