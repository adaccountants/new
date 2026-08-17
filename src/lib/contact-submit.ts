import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import {
  CONTACT_RATE_LIMIT_MESSAGE,
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_WINDOW_MS,
  getClientIpFromHeaders,
  memoryRateLimitRecord,
  memoryRateLimitWouldExceed,
} from "@/lib/contact-rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  website: z.string().optional().default(""),
});

export type SubmitContactResult = { ok: true } | { ok: false; error: string };

function envValue(name: string): string {
  return (process.env[name] ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<SubmitContactResult> => {
    if (data.website.trim().length > 0) {
      return { ok: true };
    }

    const ip = await readClientIp();
    if (memoryRateLimitWouldExceed(ip)) {
      return { ok: false, error: CONTACT_RATE_LIMIT_MESSAGE };
    }

    const { getServiceSupabase } = await import("@/lib/supabase-server");
    const db = getServiceSupabase();
    if (db) {
      const limited = await dbRateLimitWouldExceed(db, ip);
      if (limited === true) {
        return { ok: false, error: CONTACT_RATE_LIMIT_MESSAGE };
      }
    }

    memoryRateLimitRecord(ip);
    if (db) {
      await dbRateLimitRecord(db, ip);
    }

    const apiKey = envValue("RESEND_API_KEY");
    const from = envValue("RESEND_FROM");
    if (!apiKey || !from) {
      console.error("[contact] RESEND_API_KEY or RESEND_FROM is not set");
      return {
        ok: false,
        error: "The contact form is not configured yet. Please email us directly.",
      };
    }

    const { getSettings } = await import("@/lib/site-settings-data");
    const settings = await getSettings();
    const to = envValue("CONTACT_TO") || settings.email.trim();
    if (!to) {
      console.error("[contact] no recipient (CONTACT_TO or CMS Settings email)");
      return {
        ok: false,
        error: "The contact form is not configured yet. Please email us directly.",
      };
    }

    const firmName = settings.firmName.trim() || "Alpha Digi AI Accountants";
    const phoneLine = data.phone || "Not provided";
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { data: sent, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `New website enquiry from ${data.name}`,
      text: [
        `New enquiry from the ${firmName} website.`,
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${phoneLine}`,
        "",
        data.message,
      ].join("\n"),
      html: `<p>New enquiry from the ${escapeHtml(firmName)} website.</p>
<p><strong>Name:</strong> ${escapeHtml(data.name)}<br />
<strong>Email:</strong> ${escapeHtml(data.email)}<br />
<strong>Phone:</strong> ${escapeHtml(phoneLine)}</p>
<p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>`,
      tags: [{ name: "category", value: "contact-form" }],
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        ok: false,
        error: "We couldn't send your message. Please try again or email us directly.",
      };
    }

    try {
      if (db) {
        const { error: insertError } = await db.from("contact_submissions").insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
        });
        if (insertError) {
          console.error("[contact] failed to store submission", insertError.message, sent?.id);
        }
      }
    } catch (storeError) {
      console.error("[contact] failed to store submission", storeError);
    }

    return { ok: true };
  });

async function readClientIp(): Promise<string> {
  try {
    const { getRequest, getRequestIP } = await import("@tanstack/react-start/server");
    const fromHeaders = getClientIpFromHeaders(getRequest().headers);
    if (fromHeaders !== "unknown") return fromHeaders;
    return getRequestIP({ xForwardedFor: true }) ?? "unknown";
  } catch {
    return "unknown";
  }
}

type ServiceDb = SupabaseClient;

async function dbRateLimitWouldExceed(db: ServiceDb, ip: string): Promise<boolean | "unavailable"> {
  const since = new Date(Date.now() - CONTACT_RATE_LIMIT_WINDOW_MS).toISOString();
  const { error: pruneError } = await db
    .from("contact_rate_limits")
    .delete()
    .eq("ip", ip)
    .lt("submitted_at", since);
  if (pruneError) {
    console.error("[contact] rate limit prune failed", pruneError.message);
    return "unavailable";
  }

  const { count, error } = await db
    .from("contact_rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("submitted_at", since);
  if (error) {
    console.error("[contact] rate limit query failed", error.message);
    return "unavailable";
  }
  return (count ?? 0) >= CONTACT_RATE_LIMIT_MAX;
}

async function dbRateLimitRecord(db: ServiceDb, ip: string): Promise<void> {
  const { error } = await db.from("contact_rate_limits").insert({ ip });
  if (error) {
    console.error("[contact] rate limit insert failed", error.message);
  }
}
