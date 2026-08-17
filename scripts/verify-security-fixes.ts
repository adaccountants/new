import {
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_MESSAGE,
  getClientIpFromHeaders,
  memoryRateLimitRecord,
  memoryRateLimitReset,
  memoryRateLimitWouldExceed,
} from "../src/lib/contact-rate-limit.ts";
import { assertUploadAllowed } from "../src/lib/storage-upload.ts";

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
expect(results.filter(Boolean).length === CONTACT_RATE_LIMIT_MAX, `expected ${CONTACT_RATE_LIMIT_MAX} allowed, got ${results.filter(Boolean).length}`);
expect(results.slice(CONTACT_RATE_LIMIT_MAX).every((ok) => !ok), "later attempts should be blocked");
expect(CONTACT_RATE_LIMIT_MESSAGE.includes("few minutes"), "friendly error message");

expect(getClientIpFromHeaders(headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" })) === "203.0.113.9", "x-forwarded-for first hop");

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

console.log("security helper checks passed");
