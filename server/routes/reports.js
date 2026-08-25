const express = require('express');
const { pool } = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();
router.use(requireAuth);

router.get('/summary', async (req, res) => {
  const [{ rows: pr }, { rows: mr }, { rows: sr }] = await Promise.all([
    pool.query('SELECT count(*)::int AS total, COALESCE(sum(stock),0)::numeric AS qty, count(*) FILTER (WHERE stock IS NOT NULL)::int AS inventoried, count(*) FILTER (WHERE stock IS NOT NULL AND stock <= threshold)::int AS low FROM products'),
    pool.query("SELECT count(*)::int AS today_moves FROM movements WHERE ts::date = now()::date"),
    pool.query("SELECT count(*)::int AS today_sales, COALESCE(sum(total),0)::numeric AS today_total FROM sales WHERE ts::date = now()::date"),
  ]);
  const { rows: syncRows } = await pool.query("SELECT value FROM settings WHERE key = 'last_sync_at'");
  res.json({
    total_products: pr[0].total,
    total_qty: pr[0].qty,
    inventoried: pr[0].inventoried,
    low_stock: pr[0].low,
    today_moves: mr[0].today_moves,
    today_sales_count: sr[0].today_sales,
    today_sales_total: sr[0].today_total,
    last_sync_at: syncRows[0] ? syncRows[0].value : null,
  });
});

router.get('/movements-by-day', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT d::date AS day,
      COALESCE((SELECT sum(qty) FROM movements WHERE type='in' AND ts::date = d::date), 0) AS "in",
      COALESCE((SELECT sum(qty) FROM movements WHERE type='out' AND ts::date = d::date), 0) AS "out"
    FROM generate_series(now()::date - interval '13 days', now()::date, interval '1 day') AS d
    ORDER BY d
  `);
  res.json(rows);
});

router.get('/top-products', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT m.product_id, p.name, sum(m.qty) AS qty
    FROM movements m JOIN products p ON p.id = m.product_id
    WHERE m.type = 'out'
    GROUP BY m.product_id, p.name
    ORDER BY qty DESC LIMIT 6
  `);
  res.json(rows);
});

router.get('/categories', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT category AS name, count(*)::int AS count, min(cat_rank) AS rank
    FROM products GROUP BY category ORDER BY count DESC
  `);
  res.json(rows);
});

router.get('/low-stock', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE stock IS NOT NULL AND stock <= threshold ORDER BY stock ASC LIMIT 50`
  );
  res.json(rows);
});

// Real Salla store performance — populated by Claude's scheduled sync job (see /api/sync/store-sales)
router.get('/store-sales', async (req, res) => {
  const period = req.query.period || 'daily';
  const { rows } = await pool.query(
    'SELECT data, captured_at FROM store_sales_snapshot WHERE period = $1 ORDER BY captured_at DESC LIMIT 1',
    [period]
  );
  if (!rows[0]) return res.json({ data: null, captured_at: null });
  res.json({ data: rows[0].data, captured_at: rows[0].captured_at });
});

module.exports = router;
