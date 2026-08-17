-- Run this in the Supabase SQL Editor (do not run from the app).
-- Per-IP rate limiting for the public contact form.
-- Service role only: no anon/authenticated access. RLS is enabled with
-- no policies, so PostgREST roles cannot read or write these rows.

create table if not exists public.contact_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  submitted_at timestamptz not null default now()
);

create index if not exists contact_rate_limits_ip_submitted_at_idx
  on public.contact_rate_limits (ip, submitted_at desc);

alter table public.contact_rate_limits enable row level security;

revoke all on table public.contact_rate_limits from public;
revoke all on table public.contact_rate_limits from anon;
revoke all on table public.contact_rate_limits from authenticated;
grant all on table public.contact_rate_limits to service_role;

-- No CREATE POLICY statements on purpose. Without policies, RLS denies
-- every non-bypass role. The service role bypasses RLS.
