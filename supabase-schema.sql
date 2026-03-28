-- HypeHUB NEO — Supabase Schema
-- Run this in the Supabase SQL Editor

-- 1. Estado em tempo real do pipeline
create table if not exists pipeline_states (
  squad_code text primary key,
  state      jsonb not null,
  updated_at timestamptz default now()
);

-- 2. Outputs gerados por cada run
create table if not exists pipeline_outputs (
  id         uuid default gen_random_uuid() primary key,
  squad_code text not null,
  filepath   text not null,  -- ex: "2026-03-28-000001/v1/trends-brief.md"
  content    text not null,
  size_bytes int  not null,
  created_at timestamptz default now(),
  unique(squad_code, filepath)
);

-- Row Level Security: leitura pública, escrita só via service role
alter table pipeline_states  enable row level security;
alter table pipeline_outputs enable row level security;

create policy "Leitura pública — states"  on pipeline_states  for select using (true);
create policy "Escrita service role — states"  on pipeline_states  for all using (auth.role() = 'service_role');

create policy "Leitura pública — outputs" on pipeline_outputs for select using (true);
create policy "Escrita service role — outputs" on pipeline_outputs for all using (auth.role() = 'service_role');
