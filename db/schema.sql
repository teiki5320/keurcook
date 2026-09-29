-- =====================================================================
-- Keurcook — schéma de base de données (PostgreSQL, hébergé chez Neon)
-- Installation : `npm run db:setup` (voir README), ou copier-coller dans
-- l'éditeur SQL de Neon. Le script est rejouable sans perte de données.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Catalogue
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  position int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_id uuid not null references public.categories (id) on delete restrict,
  short_description text not null default '',
  description text not null default '',
  origin_country text,
  origin_region text,
  producer text,
  images text[] not null default '{}',
  -- Étiquetage alimentaire (règlement INCO) : ingrédients, allergènes, conservation.
  composition text,
  allergens text[] not null default '{}',
  usage_tips text,
  conservation text,
  tags text[] not null default '{}',
  -- Code ASIN de la fiche Amazon.fr (programme Partenaires) : bouton « Acheter » vers Amazon.
  amazon_asin text,
  is_active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);

-- Mise à niveau d'une base créée pour l'ancienne boutique (CBD) : colonnes alimentaires,
-- suppression des champs CBD. Sans effet sur une base neuve.
alter table public.products add column if not exists origin_country text;
alter table public.products add column if not exists composition text;
alter table public.products add column if not exists allergens text[] not null default '{}';
alter table public.products add column if not exists usage_tips text;
alter table public.products add column if not exists conservation text;
alter table public.products add column if not exists amazon_asin text;
alter table public.products drop column if exists cbd_rate;
alter table public.products drop column if exists thc_rate;
alter table public.products drop column if exists coa_url;
alter table public.categories drop column if exists kind;

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  price_cents int not null check (price_cents >= 0),
  stock int not null default 0 check (stock >= 0),
  sku text unique,
  position int not null default 0
);

create index if not exists product_variants_product_idx on public.product_variants (product_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- Anciennes commandes : les achats se font sur Amazon (programme Partenaires),
-- le site n'enregistre plus de commande.
-- ---------------------------------------------------------------------
drop function if exists public.place_order cascade;
drop function if exists public.cancel_order cascade;
drop table if exists public.order_items;
drop table if exists public.orders;

-- ---------------------------------------------------------------------
-- Limitation des envois (connexion admin, newsletter) : une ligne par
-- tentative, clé = action + empreinte de l'adresse IP ; purgée après un jour.
-- ---------------------------------------------------------------------
create table if not exists public.rate_limits (
  id bigint generated always as identity primary key,
  key text not null,
  created_at timestamptz not null default now()
);
create index if not exists rate_limits_key_idx on public.rate_limits (key, created_at);
alter table public.rate_limits enable row level security;

-- ---------------------------------------------------------------------
-- Réglages du site (clé → valeur JSON). Ex. : maintenance.
-- ---------------------------------------------------------------------
create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Recettes
-- Ingrédients : [{ quantity, unit, name, productSlug }] ; étapes : [{ text, image }].
-- ---------------------------------------------------------------------
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country_code text not null,
  region text,
  course text not null check (course in ('mijotes', 'grillades', 'riz-cereales', 'accompagnements', 'douceurs')),
  short_description text not null default '',
  story text not null default '',
  image text,
  prep_minutes int not null default 0 check (prep_minutes >= 0),
  cook_minutes int not null default 0 check (cook_minutes >= 0),
  servings int not null default 4 check (servings between 1 and 50),
  difficulty int not null default 1 check (difficulty between 1 and 3),
  ingredients jsonb not null default '[]',
  steps jsonb not null default '[]',
  tips text[] not null default '{}',
  tags text[] not null default '{}',
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists recipes_touch on public.recipes;
create trigger recipes_touch before update on public.recipes
for each row execute function public.touch_updated_at();

-- Les avis des visiteurs ont été retirés du site.
drop table if exists public.recipe_reviews;

-- Inscrits à la newsletter (consentement explicite, désinscription possible).
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  consent_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_idx on public.newsletter_subscribers (lower(email));
