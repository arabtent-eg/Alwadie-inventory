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

module.exports = router;
