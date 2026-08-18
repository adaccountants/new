-- Run this in the SQL Editor if tables already exist.
-- It restores table GRANTs and replaces policies that queried public.admins
-- as the calling role (that caused "permission denied for table admins").

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

grant all on table public.contact_rate_limits to service_role;
revoke all on table public.contact_rate_limits from public;
revoke all on table public.contact_rate_limits from anon;
revoke all on table public.contact_rate_limits from authenticated;

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

drop policy if exists admins_select on public.admins;
create policy admins_select
  on public.admins
  for select
  using (auth.uid() = id);

drop policy if exists storage_public_select on storage.objects;

update storage.buckets set public = true where id = 'card-images';
update storage.buckets set public = false where id = 'knowledge-files';

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
