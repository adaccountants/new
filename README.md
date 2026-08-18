# Alpha Digi AI Accountants

Marketing site for Alpha Digi AI Accountants — ICAEW chartered accountants in London.

## Tech

TanStack Start, TanStack Router, React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and shadcn/ui. See [TECH_STACK.md](./TECH_STACK.md) for the full list.

## Development

You need Node.js and npm.

```sh
npm i
npm run dev
```

The app runs at [http://localhost:8080](http://localhost:8080).

## Supabase

CMS data, admin auth, and file uploads use Supabase.

1. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Add **Production** values in Vercel only for the production Supabase project (see [Preview vs Production](#preview-vs-production-vercel-environment-variables) — do not reuse production service-role or Resend keys on Preview). After changing Vercel env vars, redeploy. If Production is missing `SUPABASE_SERVICE_ROLE_KEY`, public pages still load via the anon key; the contact-form store and knowledge signed URLs will not.
2. In the Supabase SQL Editor, run `supabase/schema.sql`.
3. If the tables already exist, run `supabase/grants.sql`. That restores GRANTs and replaces policies that queried `public.admins` as `anon` (which caused `permission denied for table admins` on cards). Then run `supabase/storage-hardening.sql` so `knowledge-files` is private and neither bucket is listable by anonymous clients.
4. Optionally run `supabase/seed-page-content.sql` and `supabase/seed-cards.sql` to load the current site copy.
5. Authentication → Users → Add user (email + password). Then insert that user into `public.admins` (see the comment at the bottom of `schema.sql`).
6. Restart `npm run dev`.

## Contact form (Resend)

The `/contact` form sends an email through [Resend](https://resend.com) and stores a copy in Supabase `contact_submissions`. The API key never ships to the browser (`RESEND_*` must not use a `VITE_` prefix). Every submission is sent to **info@adaaccountants.uk**. Reply-To is the visitor’s address so you can reply from that inbox.

Do not skip domain verification for production. `beth.t@example.com` is a Resend test sender only — it can send to the email on your Resend account, not to arbitrary inboxes.

### 1. Create a Resend account and API key

1. Sign up at [https://resend.com/signup](https://resend.com/signup).
2. Open [API Keys](https://resend.com/api-keys) → **Create API Key**.
3. Name it something like `ada-contact-form`. Permission: **Sending access** is enough.
4. Copy the key immediately (`re_…`). Resend will not show it again.

### 2. Verify `adaaccountants.uk` (production)

Resend will not deliver from your own domain until DNS is verified. Add the domain at [https://resend.com/domains](https://resend.com/domains).

Recommended: add the **root** `adaaccountants.uk` if you want `From: info@adaaccountants.uk`. Resend’s SPF/MX records go on a **`send` subdomain**, so they do not replace the existing MX records that already deliver mail to `info@adaaccountants.uk`. Alternatively add a sending subdomain such as `updates.adaaccountants.uk` (then the From address must use that subdomain).

1. In Resend, **Add Domain** → `adaaccountants.uk` (region closest to your recipients, typically Ireland / EU).
2. Open the domain’s **Records** tab. Copy the records Resend generated — they must match exactly.
3. In your DNS host (Cloudflare, Namecheap, GoDaddy, etc.), add:

   | Typical type | Typical host (omit the root domain) | Purpose                   |
   | ------------ | ----------------------------------- | ------------------------- |
   | `MX`         | `send`                              | Return-path / SPF mailbox |
   | `TXT`        | `send`                              | SPF                       |
   | `TXT`        | `resend._domainkey`                 | DKIM                      |

   If the DNS UI already appends `adaaccountants.uk`, enter only `send` and `resend._domainkey`, not `send.adaaccountants.uk`.

4. Click **Verify DNS Records** in Resend. This is often done within 15 minutes; it can take up to 72 hours. Check public DNS with [dns.email](https://dns.email/) or:

   ```sh
   nslookup -type=TXT resend._domainkey.adaaccountants.uk
   nslookup -type=TXT send.adaaccountants.uk
   nslookup -type=MX send.adaaccountants.uk
   ```

5. Optional but recommended after verification: add a [DMARC](https://resend.com/docs/dashboard/domains/dmarc) TXT record on `_dmarc`.

Provider-specific walkthroughs: [Cloudflare](https://resend.com/docs/dashboard/domains/cloudflare), [Namecheap](https://resend.com/docs/knowledge-base/namecheap), [other hosts](https://resend.com/docs/knowledge-base/introduction).

### 3. Environment variables

Copy `.env.example` values into local `.env`. On Vercel, set Resend keys for **Production** only (or a dedicated Preview Resend project) — never copy the production `RESEND_API_KEY` onto Preview. See [Preview vs Production](#preview-vs-production-vercel-environment-variables). Redeploy after saving.

| Variable         | Where       | Example                                              |
| ---------------- | ----------- | ---------------------------------------------------- |
| `RESEND_API_KEY` | Server only | `re_…` from step 1                                   |
| `RESEND_FROM`    | Server only | `Alpha Digi AI Accountants <info@adaaccountants.uk>` |

`RESEND_FROM` must use an address on the verified domain. Friendly-name syntax is `Name <email@domain>`.

**Local testing before DNS is verified:** set `RESEND_FROM=Alpha Digi AI Accountants <beth.t@example.com>` and submit the form. Resend will deliver only to the email address on that Resend account. Switch `RESEND_FROM` to `info@adaaccountants.uk` (or your sending subdomain) before production.

### 4. Confirm it works

1. Restart `npm run dev` after changing `.env`.
2. Open [http://localhost:8080/contact](http://localhost:8080/contact), send a test message.
3. Check [Resend → Emails](https://resend.com/emails) for `Delivered`.
4. Reply from your inbox — Reply-To is the visitor.
5. Optional: in Supabase, Table Editor → `contact_submissions` (needs `SUPABASE_SERVICE_ROLE_KEY` on the server).

On Vercel, after adding the env vars, trigger a new deployment. A failed send shows an error on the form; it does not fake a thank-you.

## Preview vs Production (Vercel environment variables)

Preview deployments must **not** share production `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY`. A public PR URL would otherwise be a second production CMS and contact inbox against the live database and mail quota.

**Do this in the Vercel dashboard now:**

1. Open the project → **Settings** → **Environment Variables**.
2. For each of `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `RESEND_FROM`:
   - Expand the variable.
   - If **Preview** (or **Preview + Production**) is checked, either:
     - **Remove Preview** so the value applies to **Production** only, or
     - Delete the variable and recreate it with **Production** selected and Preview unchecked.
3. Repeat for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` unless Preview is pointed at a **separate** (non-production) Supabase project. If Preview should not talk to production at all, do not leave production URL/anon/service-role on the Preview environment.
4. Optional but recommended if any Preview env still has credentials: **Settings** → **Deployment Protection** → enable protection on Preview so unauthenticated visitors cannot open PR URLs.
5. Redeploy Production after the change. Delete or redeploy any existing Preview deployments that were built with production secrets.

**Preview should use one of:**

- A separate Supabase project (and a separate Resend API key / test sender) created only for previews, **or**
- No privileged secrets on Preview, plus Deployment Protection enabled before any secrets are attached.

Do not provision a second Supabase project from this repo; create it in the Supabase dashboard if you want isolated Preview data.

### Troubleshooting

| Symptom                                     | What to check                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Form says it is not configured              | `RESEND_API_KEY` / `RESEND_FROM` missing on that environment                                       |
| Resend error / “couldn’t send”              | From address domain not verified; API key revoked; look at the Vercel function logs                |
| Mail never arrives                          | Domain still `Pending`; SPF/DKIM host names include the root twice; check Resend Emails for bounce |
| Can send to yourself but not the firm inbox | Still using `beth.t@example.com` — switch `RESEND_FROM` after verification                         |
| Row missing in `contact_submissions`        | Email can still succeed; confirm `SUPABASE_SERVICE_ROLE_KEY` is set on the server                  |

## Scripts

| Script            | What it does                 |
| ----------------- | ---------------------------- |
| `npm run dev`     | Vite development server      |
| `npm run build`   | Production build             |
| `npm run preview` | Preview the production build |
| `npm run lint`    | ESLint                       |
| `npm run format`  | Prettier                     |

## Routes

File-based routes live in `src/routes/`. The site shell is `src/routes/__root.tsx`.
