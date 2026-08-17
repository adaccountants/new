-- Alpha Digi CMS schema
-- Run this in the Supabase SQL Editor (do not run from the app).
-- After this script: create your admin user in Authentication, then insert
-- that user's UUID into public.admins (see the comment at the bottom).

-- ---------------------------------------------------------------------------
-- 1. cards
-- ---------------------------------------------------------------------------
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  slug text,
  title text not null,
  subtitle text,
  body text,
  image_url text not null default '',
  file_url text,
  file_name text,
  category text,
  link_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists cards_section_slug_idx
  on public.cards (section, slug)
  where slug is not null;

-- ---------------------------------------------------------------------------
-- 2. page_content
-- ---------------------------------------------------------------------------
create table if not exists public.page_content (
  key text primary key,
  page text not null,
  label text not null,
  value text not null default '',
  type text not null default 'text',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. site_settings (singleton) + seed from current mock values
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1,
  firm_name text not null,
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  hours text not null default '',
  socials jsonb not null default '[]'::jsonb,
  footer_text text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (
  id, firm_name, phone, email, address, hours, socials, footer_text
) values (
  1,
  'Alpha Digi AI Accountants',
  '020 3916 5680',
  'info@adaaccountants.uk',
  'Suite RA01, 195-197 Wood Street, London E17 3NU',
  'Mon – Fri, 9AM – 5PM',
  '[
    {"platform":"Instagram","url":"https://instagram.com"},
    {"platform":"X","url":"https://x.com/ADAiaccountants"},
    {"platform":"LinkedIn","url":"https://www.linkedin.com/company/alpha-digiai-accountants-ltd/about/?viewAsMember=true"},
    {"platform":"YouTube","url":"https://youtube.com"},
    {"platform":"Facebook","url":"https://facebook.com"}
  ]'::jsonb,
  'Alpha Digi AI Accountants. ICAEW Chartered Accountants.'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 4. contact_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. admins
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Table privileges (RLS still decides which rows). Without these GRANTs the
-- anon/authenticated/service_role keys get "permission denied for table".
grant usage on schema public to anon, authenticated, service_role;

grant select on table public.cards to anon, authenticated, service_role;
grant insert, update, delete on table public.cards to authenticated, service_role;

grant select on table public.page_content to anon, authenticated, service_role;
grant insert, update, delete on table public.page_content to authenticated, service_role;

grant select on table public.site_settings to anon, authenticated, service_role;
grant insert, update, delete on table public.site_settings to authenticated, service_role;

grant all on table public.contact_submissions to service_role;
revoke all on table public.contact_submissions from anon;
grant select, update, delete on table public.contact_submissions to authenticated;

grant select on table public.admins to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 6. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.cards enable row level security;
alter table public.page_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.admins enable row level security;

-- Avoid recursive RLS when policies check public.admins.
-- Must not subquery public.admins directly in policies: anon has no GRANT
-- on that table, so SELECT on cards would fail with 42501.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated, service_role;

-- cards: public can read published rows; admins have full access
drop policy if exists cards_public_select on public.cards;
create policy cards_public_select
  on public.cards
  for select
  using (published = true);

drop policy if exists cards_admin_all on public.cards;
create policy cards_admin_all
  on public.cards
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- page_content: public read; admins full access
drop policy if exists page_content_public_select on public.page_content;
create policy page_content_public_select
  on public.page_content
  for select
  using (true);

drop policy if exists page_content_admin_all on public.page_content;
create policy page_content_admin_all
  on public.page_content
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- site_settings: public read; admins full access
drop policy if exists site_settings_public_select on public.site_settings;
create policy site_settings_public_select
  on public.site_settings
  for select
  using (true);

drop policy if exists site_settings_admin_all on public.site_settings;
create policy site_settings_admin_all
  on public.site_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- contact_submissions: public writes go through the service role.
-- Authenticated CMS admins can read, update status, and delete (GDPR).
drop policy if exists contact_submissions_admin_select on public.contact_submissions;
create policy contact_submissions_admin_select
  on public.contact_submissions
  for select
  to authenticated
  using (auth.uid() in (select id from public.admins));

drop policy if exists contact_submissions_admin_update on public.contact_submissions;
create policy contact_submissions_admin_update
  on public.contact_submissions
  for update
  to authenticated
  using (auth.uid() in (select id from public.admins))
  with check (auth.uid() in (select id from public.admins));

drop policy if exists contact_submissions_admin_delete on public.contact_submissions;
create policy contact_submissions_admin_delete
  on public.contact_submissions
  for delete
  to authenticated
  using (auth.uid() in (select id from public.admins));

-- admins: only existing admins can read admin rows
-- `auth.uid() = id` avoids recursive RLS on this table.
drop policy if exists admins_select on public.admins;
create policy admins_select
  on public.admins
  for select
  using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- 7. Storage buckets + policies
-- Dashboard alternative: Storage → New bucket → card-images (public),
-- knowledge-files (public). The SQL below does the same.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('card-images', 'card-images', true),
  ('knowledge-files', 'knowledge-files', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists storage_public_select on storage.objects;
create policy storage_public_select
  on storage.objects
  for select
  using (bucket_id in ('card-images', 'knowledge-files'));

drop policy if exists storage_admin_insert on storage.objects;
create policy storage_admin_insert
  on storage.objects
  for insert
  with check (
    bucket_id in ('card-images', 'knowledge-files')
    and public.is_admin()
  );

drop policy if exists storage_admin_update on storage.objects;
create policy storage_admin_update
  on storage.objects
  for update
  using (
    bucket_id in ('card-images', 'knowledge-files')
    and public.is_admin()
  )
  with check (
    bucket_id in ('card-images', 'knowledge-files')
    and public.is_admin()
  );

drop policy if exists storage_admin_delete on storage.objects;
create policy storage_admin_delete
  on storage.objects
  for delete
  using (
    bucket_id in ('card-images', 'knowledge-files')
    and public.is_admin()
  );

-- After this file, optionally run seed-page-content.sql then seed-cards.sql
-- to load the current marketing copy.
--
-- Manual: create the first admin
-- 1. Authentication → Users → Add user (email + password).
-- 2. Copy the user's UUID, then run:
--
-- insert into public.admins (id, email)
-- values ('PASTE-USER-UUID-HERE', 'you@example.com');
-- ---------------------------------------------------------------------------
