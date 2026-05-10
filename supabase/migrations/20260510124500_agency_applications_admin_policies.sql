-- Admin policies for agency_applications (Piece 1.3)
-- Admins are users whose profiles.role = 'agency'
-- This enables the approve/reject flow.

alter table public.agency_applications enable row level security;

-- Admin can read all applications
drop policy if exists "Admins can read all agency applications" on public.agency_applications;
create policy "Admins can read all agency applications"
on public.agency_applications
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
);

-- Admin can update application status
drop policy if exists "Admins can update agency applications" on public.agency_applications;
create policy "Admins can update agency applications"
on public.agency_applications
for update
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
);
