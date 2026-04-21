create table subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  confirmed boolean default false
);

-- Index für schnellere Abfragen nach Tags
create index idx_subscribers_tags on subscribers using gin(tags); 