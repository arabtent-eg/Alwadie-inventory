const express = require('express');
const { pool } = require('../db');
const { requireSyncKey } = require('../auth');

const router = express.Router();
router.use(requireSyncKey);

// Pending warehouse movements Claude still needs to push to Salla
router.get('/pending', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, product_id, type, qty, note, ts FROM movements WHERE synced = false ORDER BY ts ASC LIMIT 200`
  );
  res.json(rows);
});

// Claude reports back what synced / failed
router.post('/ack', async (req, res) => {
  const { results } = req.body || {};
  if (!Array.isArray(results)) return res.status(400).json({ error: 'invalid_input' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const r of results) {
      await client.query(
        'UPDATE movements SET synced = $1, sync_error = $2 WHERE id = $3',
        [!!r.synced, r.sync_error || null, r.id]
      );
    }
    await client.query('COMMIT');
    res.json({ ok: true, count: results.length });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

router.get('/state', async (req, res) => {
  const { rows } = await pool.query("SELECT value FROM settings WHERE key = 'last_sync_at'");
  res.json({ last_sync_at: rows[0] ? rows[0].value : null });
});

router.post('/state', async (req, res) => {
  const { last_sync_at } = req.body || {};
  await pool.query(
    `INSERT INTO settings (key, value) VALUES ('last_sync_at', $1)
     ON CONFLICT (key) DO UPDATE SET value = $1`,
    [JSON.stringify(last_sync_at)]
  );
  res.json({ ok: true });
});

// Claude pushes a fresh snapshot of real Salla store performance (daily sales trend + top products)
router.post('/store-sales', async (req, res) => {
  const { period, data } = req.body || {};
  if (!period || !data) return res.status(400).json({ error: 'invalid_input' });
  await pool.query('INSERT INTO store_sales_snapshot (period, data) VALUES ($1,$2)', [period, JSON.stringify(data)]);
  // keep only the latest 20 snapshots per period to avoid unbounded growth
  await pool.query(
    `DELETE FROM store_sales_snapshot WHERE id IN (
       SELECT id FROM store_sales_snapshot WHERE period = $1
       ORDER BY captured_at DESC OFFSET 20
     )`, [period]
  );
  res.json({ ok: true });
});

module.exports = router;
