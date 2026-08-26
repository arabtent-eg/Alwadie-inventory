const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole } = require('../auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT s.*,
       (SELECT count(*) FROM sale_items si WHERE si.sale_id = s.id) AS item_count,
       COALESCE((SELECT bool_and(m.synced) FROM movements m WHERE m.sale_id = s.id), false) AS synced
     FROM sales s ORDER BY s.ts DESC LIMIT 500`
  );
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows: srows } = await pool.query('SELECT * FROM sales WHERE id = $1', [req.params.id]);
  if (!srows[0]) return res.status(404).json({ error: 'not_found' });
  const { rows: items } = await pool.query('SELECT * FROM sale_items WHERE sale_id = $1', [req.params.id]);
  res.json({ ...srows[0], items });
});

router.post('/', requireRole('manager', 'accountant'), async (req, res) => {
  const { invoice_no, customer, items, channel } = req.body || {};
  if (!invoice_no || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  for (const it of items) {
    if (!it.product_id || !it.qty || it.qty <= 0) return res.status(400).json({ error: 'invalid_item' });
  }
  const ch = ['store', 'warehouse'].includes(channel) ? channel : 'warehouse';
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let total = 0;
    const { rows: saleRows } = await client.query(
      `INSERT INTO sales (invoice_no, customer, total, channel, created_by) VALUES ($1,$2,0,$3,$4) RETURNING *`,
      [invoice_no, customer || null, ch, req.user.id]
    );
    const sale = saleRows[0];
    for (const it of items) {
      const { rows: prows } = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [it.product_id]);
      const p = prows[0];
      if (!p) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'product_not_found', product_id: it.product_id }); }
      const prev = p.stock === null ? 0 : Number(p.stock);
      const next = Math.max(0, prev - Number(it.qty));
      await client.query('UPDATE products SET stock = $1, updated_at = now() WHERE id = $2', [next, it.product_id]);
      const price = it.price !== undefined ? Number(it.price) : Number(p.price);
      total += price * Number(it.qty);
      await client.query(
        `INSERT INTO sale_items (sale_id, product_id, name, qty, price) VALUES ($1,$2,$3,$4,$5)`,
        [sale.id, it.product_id, p.name, it.qty, price]
      );
      await client.query(
        `INSERT INTO movements (product_id, type, qty, note, sale_id, created_by)
         VALUES ($1,'out',$2,$3,$4,$5)`,
        [it.product_id, it.qty, 'فاتورة بيع #' + invoice_no, sale.id, req.user.id]
      );
    }
    await client.query('UPDATE sales SET total = $1 WHERE id = $2', [total, sale.id]);
    await client.query('COMMIT');
    res.status(201).json({ ...sale, total });
  } catch (e) {
    await client.query('ROLLBACK');
    if (e.code === '23505') return res.status(409).json({ error: 'invoice_no_taken' });
    throw e;
  } finally {
    client.release();
  }
});

module.exports = router;
