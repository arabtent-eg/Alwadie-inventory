require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { pool, initSchema } = require('../server/db');
const { hashPassword } = require('../server/auth');

async function main() {
  await initSchema();

  // 1) seed products (idempotent upsert) from the same real Salla catalog pulled earlier
  const seedPath = path.join(__dirname, 'products-seed.json');
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  let count = 0;
  for (const p of seed.products) {
    await pool.query(
      `INSERT INTO products (id, name, category, cat_rank, icon, price, sku, status, stock, threshold)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (id) DO NOTHING`,
      [p.id, p.name, p.category, p.cat_rank, p.icon, p.price, p.sku, p.status, p.stock, p.threshold]
    );
    count++;
  }
  console.log(`Seeded/verified ${count} products.`);

  // 2) create the first manager account if no users exist yet
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM users');
  if (rows[0].n === 0) {
    const username = process.env.INITIAL_MANAGER_USERNAME || 'manager';
    const password = process.env.INITIAL_MANAGER_PASSWORD || crypto.randomBytes(6).toString('base64url');
    await pool.query(
      `INSERT INTO users (username, password_hash, display_name, role) VALUES ($1,$2,$3,'manager')`,
      [username, hashPassword(password), 'مدير النظام']
    );
    console.log('----------------------------------------------------');
    console.log('Created initial manager account:');
    console.log('  username:', username);
    console.log('  password:', password);
    console.log('  (change this password after first login — Settings > المستخدمون)');
    console.log('----------------------------------------------------');
  } else {
    console.log('Users already exist, skipping initial manager creation.');
  }

  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
