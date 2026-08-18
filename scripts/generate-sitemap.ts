import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { getCards, isHomeServiceCard } from "@/lib/cards-data";
import { SITE_URL } from "@/lib/site-settings-data";

/**
 * Build-time sitemap for public/sitemap.xml.
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at Vercel **build** time
 * (not only runtime). The script uses the public anon client + RLS to read
 * published service cards. SUPABASE_SERVICE_ROLE_KEY is not required here.
 *
 * If those VITE_ vars are missing, this script exits non-zero and the build fails.
 */

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/careers",
  "/contact",
  "/knowledge",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function loc(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

async function main() {
  if (!process.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL) {
    throw new Error(
      "VITE_SUPABASE_URL is required at build time to generate sitemap.xml. Set it in Vercel → Project → Settings → Environment Variables for Production (and Preview).",
    );
  }

  const services = (await getCards("services")).filter(
    (card): card is typeof card & { slug: string } =>
      card.published && Boolean(card.slug) && !isHomeServiceCard(card),
  );

  const paths = [...STATIC_PATHS, ...services.map((card) => `/services/${card.slug}`)];
  const unique = [...new Set(paths)];

  const body = unique
    .map(
      (path) => `  <url>
    <loc>${escapeXml(loc(path))}</loc>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  const out = resolve(process.cwd(), "public/sitemap.xml");
  writeFileSync(out, xml, "utf8");
  console.log(`[sitemap] wrote ${unique.length} URLs to public/sitemap.xml`);
}

void main().catch((error: unknown) => {
  console.error("[sitemap] failed:", error);
  process.exit(1);
});
