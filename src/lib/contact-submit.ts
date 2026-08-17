import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const to = "info@adaaccountants.uk";

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
      const { getServiceSupabase } = await import("@/lib/supabase-server");
      const db = getServiceSupabase();
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
