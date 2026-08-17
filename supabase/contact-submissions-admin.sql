-- Run this in the Supabase SQL Editor.
-- Allows signed-in CMS admins to read, update, and delete contact form
-- submissions so GDPR deletion requests can be fulfilled from /admin/inbox.
--
-- Admin check: auth.uid() in (select id from public.admins)
-- Equivalent to public.is_admin() used elsewhere in this schema.

revoke all on table public.contact_submissions from anon;
grant select, update, delete on table public.contact_submissions to authenticated;

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
