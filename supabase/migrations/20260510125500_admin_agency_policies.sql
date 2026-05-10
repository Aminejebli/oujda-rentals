-- Admin policies for approving agencies (Piece 1.3)
-- Admin is a user with profiles.role = 'agency'

-- Profiles: admin can update role
alter table public.profiles enable row level security;

drop policy if exists "Admins can update profiles role" on public.profiles;
create policy "Admins can update profiles role"
on public.profiles
for update
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
);

-- Agencies: admin can insert
alter table public.agencies enable row level security;

drop policy if exists "Admins can insert agencies" on public.agencies;
create policy "Admins can insert agencies"
on public.agencies
for insert
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role = 'agency'
  )
);
