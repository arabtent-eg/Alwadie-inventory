const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole } = require('../auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT m.*, p.name AS product_name
     FROM movements m JOIN products p ON p.id = m.product_id
     ORDER BY m.ts DESC LIMIT 500`
  );
  res.json(rows);
});

router.post('/', requireRole('manager', 'accountant'), async (req, res) => {
  const { product_id, type, qty, note } = req.body || {};
  if (!product_id || !['in', 'out', 'adjust'].includes(type) || !qty || qty <= 0) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: prows } = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [product_id]);
    const p = prows[0];
    if (!p) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'product_not_found' }); }
    const prev = p.stock === null ? 0 : Number(p.stock);
    let next;
    if (type === 'in') next = prev + Number(qty);
    else if (type === 'out') next = Math.max(0, prev - Number(qty));
    else next = Number(qty);
    await client.query('UPDATE products SET stock = $1, updated_at = now() WHERE id = $2', [next, product_id]);
    const { rows: mrows } = await client.query(
      `INSERT INTO movements (product_id, type, qty, note, created_by)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [product_id, type, qty, note || null, req.user.id]
    );
    await client.query('COMMIT');
    res.status(201).json({ movement: mrows[0], new_stock: next });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

// Bulk stock update from an imported Excel sheet — treats each row as a fresh
// inventory count (type 'adjust'): sets the product's stock to the given qty.
router.post('/bulk-import', requireRole('manager', 'accountant'), async (req, res) => {
  const { rows } = req.body || {};
  if (!Array.isArray(rows) || !rows.length) return res.status(400).json({ error: 'invalid_input' });
  const results = [];
  for (const r of rows) {
    const product_id = String(r.product_id || '').trim();
    const qty = Number(r.qty);
    if (!product_id || Number.isNaN(qty) || qty < 0) {
      results.push({ product_id: product_id || null, ok: false, error: 'صف غير صالح' });
      continue;
    }
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rows: prows } = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [product_id]);
      const p = prows[0];
      if (!p) {
        await client.query('ROLLBACK');
        results.push({ product_id, ok: false, error: 'الصنف غير موجود بالنظام' });
        continue;
      }
      await client.query('UPDATE products SET stock = $1, updated_at = now() WHERE id = $2', [qty, product_id]);
      await client.query(
        `INSERT INTO movements (product_id, type, qty, note, created_by) VALUES ($1,'adjust',$2,$3,$4)`,
        [product_id, qty, r.note || 'تحديث مخزون جماعي (استيراد Excel)', req.user.id]
      );
      await client.query('COMMIT');
      results.push({ product_id, ok: true, name: p.name, new_stock: qty });
    } catch (e) {
      await client.query('ROLLBACK');
      results.push({ product_id, ok: false, error: 'خطأ غير متوقع' });
    } finally {
      client.release();
    }
  }
  res.json({ results, succeeded: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok).length });
});

module.exports = router;
