-- Run in the Supabase SQL Editor against the existing project.
-- Adds founder fields to site_settings and seeds the current principal.
-- Safe to re-run: columns are IF NOT EXISTS; seed overwrites founder_* on id = 1.

alter table public.site_settings
  add column if not exists founder_name text not null default '',
  add column if not exists founder_role text not null default '',
  add column if not exists founder_credentials text not null default '',
  add column if not exists founder_bio text not null default '',
  add column if not exists founder_photo_url text not null default '';

update public.site_settings
set
  founder_name = 'Hritesh Gupta',
  founder_role = 'Founder & Principal Accountant',
  founder_credentials = 'ACA (ICAEW), ACA (ICAI), IFRS Certified (ACCA)',
  founder_bio = $founder_bio$Alpha Digi AI Accountants is led by Hritesh Gupta, a member of the ICAEW with over 12 years of experience, including time at a Big Four firm in the UK. He has varied experience across industrial audits and has worked with clients across different geographies worldwide. He is also a member of the ICAI with experience working in India, an IIM alumnus, and IFRS certified by the ACCA. Throughout his career, he has worked extensively with charities, US-listed clients, and small and medium-sized enterprises.$founder_bio$,
  founder_photo_url = ''
where id = 1;
