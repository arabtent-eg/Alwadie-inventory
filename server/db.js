const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
});

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('manager','accountant','user')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'غير مصنف',
  cat_rank INT NOT NULL DEFAULT 7,
  icon TEXT NOT NULL DEFAULT 'box',
  price NUMERIC NOT NULL DEFAULT 0,
  sku TEXT,
  status TEXT NOT NULL DEFAULT 'sale',
  stock NUMERIC,
  threshold NUMERIC NOT NULL DEFAULT 10,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  product_id TEXT NOT NULL REFERENCES products(id),
  type TEXT NOT NULL CHECK (type IN ('in','out','adjust')),
  qty NUMERIC NOT NULL,
  note TEXT,
  sale_id UUID,
  synced BOOLEAN NOT NULL DEFAULT false,
  sync_error TEXT,
  created_by UUID REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_movements_synced ON movements(synced);
CREATE INDEX IF NOT EXISTS idx_movements_product ON movements(product_id);

CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  invoice_no TEXT NOT NULL UNIQUE,
  customer TEXT,
  total NUMERIC NOT NULL DEFAULT 0,
  created_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  price NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS store_sales_snapshot (
  id SERIAL PRIMARY KEY,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  period TEXT NOT NULL,
  data JSONB NOT NULL
);
`;

async function initSchema() {
  await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
  await pool.query(SCHEMA);
}

module.exports = { pool, initSchema };
