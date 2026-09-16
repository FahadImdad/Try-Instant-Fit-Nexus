-- Try Instant Fit — Ghost Layer MVP Schema
-- Run this in your Supabase SQL editor to set up the database

-- ── Brands ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  website_url  TEXT,
  status       TEXT NOT NULL DEFAULT 'trial'
                 CHECK (status IN ('trial', 'active', 'suspended', 'cancelled')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Widget Configs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS widget_configs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id         UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  enabled          BOOLEAN NOT NULL DEFAULT TRUE,
  button_text      TEXT NOT NULL DEFAULT 'Try It On ✨',
  button_color     TEXT NOT NULL DEFAULT '#1a1a2e',
  button_position  TEXT NOT NULL DEFAULT 'bottom-right'
                     CHECK (button_position IN ('top-right','bottom-right','top-left','bottom-left')),
  show_platform_logo BOOLEAN NOT NULL DEFAULT TRUE,
  vendor_logo_url   TEXT,
  platform_logo_url TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (brand_id)
);

-- Safe migration for installations created before download branding settings.
ALTER TABLE widget_configs ADD COLUMN IF NOT EXISTS show_platform_logo BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE widget_configs ADD COLUMN IF NOT EXISTS vendor_logo_url TEXT;
ALTER TABLE widget_configs ADD COLUMN IF NOT EXISTS platform_logo_url TEXT;
ALTER TABLE widget_configs ADD COLUMN IF NOT EXISTS vendor_name TEXT;
ALTER TABLE widget_configs ADD COLUMN IF NOT EXISTS platform_name TEXT NOT NULL DEFAULT 'Try Instant Fit';

-- ── Try-Ons ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tryons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id            UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  product_id          TEXT,
  product_name        TEXT,
  result_image_url    TEXT NOT NULL,
  ai_model            TEXT NOT NULL,
  processing_time_ms  INTEGER,
  cost_usd            NUMERIC(10, 4),
  source              TEXT NOT NULL DEFAULT 'ghost-layer'
                        CHECK (source IN ('ghost-layer','scan-wear','digital-mirror')),
  access_mode         TEXT NOT NULL DEFAULT 'free'
                        CHECK (access_mode IN ('free','passcode')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Safe migration for installations created before access-mode analytics.
ALTER TABLE tryons ADD COLUMN IF NOT EXISTS access_mode TEXT NOT NULL DEFAULT 'free';
UPDATE tryons SET access_mode = 'free' WHERE access_mode IS NULL;
ALTER TABLE tryons DROP CONSTRAINT IF EXISTS tryons_access_mode_check;
ALTER TABLE tryons ADD CONSTRAINT tryons_access_mode_check
  CHECK (access_mode IN ('free','passcode'));

-- ── Analytics Events ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  event_name  TEXT NOT NULL,
  event_data  JSONB NOT NULL DEFAULT '{}',
  page_url    TEXT,
  product     TEXT NOT NULL DEFAULT 'ghost-layer',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── FX Rates (USD-based, refreshed daily by cron) ────────────────────────────
CREATE TABLE IF NOT EXISTS fx_rates (
  currency    TEXT PRIMARY KEY,
  rate        NUMERIC(12, 4) NOT NULL,
  source      TEXT NOT NULL DEFAULT 'open.er-api.com',
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tryons_brand_id ON tryons(brand_id);
CREATE INDEX IF NOT EXISTS idx_tryons_created_at ON tryons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tryons_access_mode ON tryons(access_mode);
CREATE INDEX IF NOT EXISTS idx_analytics_brand_id ON analytics_events(brand_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);

-- ── Demo Brand (for testing) ──────────────────────────────────────────────────
INSERT INTO brands (id, name, email, website_url, status)
VALUES (
  '00000000-0000-0000-0000-000000000001'::UUID,
  'Your Brand (Demo)',
  'demo@yourbrand.com',
  'https://client-tryinstantfit.vercel.app',
  'active'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO widget_configs (brand_id, button_text, button_color, button_position)
VALUES (
  '00000000-0000-0000-0000-000000000001'::UUID,
  'Try It On ✨',
  '#FF5C35',
  'bottom-right'
) ON CONFLICT (brand_id) DO NOTHING;
