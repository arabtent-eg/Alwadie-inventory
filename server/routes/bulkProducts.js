const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole } = require('../auth');

const router = express.Router();
router.use(requireAuth);

// Visible to every role (manager, accountant, user/customer service) — read-only for 'user'
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM bulk_products ORDER BY name ASC');
  res.json(rows);
});

router.post('/', requireRole('manager', 'accountant'), async (req, res) => {
  const { name, category, unit_type, units_per_bundle, bundle_count, retail_price_ref, notes } = req.body || {};
  if (!name || !unit_type || !['pallet', 'carton'].includes(unit_type)) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  const { rows } = await pool.query(
    `INSERT INTO bulk_products (name, category, unit_type, units_per_bundle, bundle_count, retail_price_ref, notes, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      name,
      category || 'غير مصنف',
      unit_type,
      Number(units_per_bundle) || 1,
      Number(bundle_count) || 0,
      retail_price_ref === '' || retail_price_ref === undefined ? null : Number(retail_price_ref),
      notes || null,
      req.user.id,
    ]
  );
  res.status(201).json(rows[0]);
});

router.patch('/:id', requireRole('manager', 'accountant'), async (req, res) => {
  const { name, category, unit_type, units_per_bundle, bundle_count, retail_price_ref, notes } = req.body || {};
  const { rows: existing } = await pool.query('SELECT * FROM bulk_products WHERE id = $1', [req.params.id]);
  if (!existing[0]) return res.status(404).json({ error: 'not_found' });
  const cur = existing[0];
  const { rows } = await pool.query(
    `UPDATE bulk_products SET
       name = $1, category = $2, unit_type = $3, units_per_bundle = $4,
       bundle_count = $5, retail_price_ref = $6, notes = $7, updated_at = now()
     WHERE id = $8 RETURNING *`,
    [
      name ?? cur.name,
      category ?? cur.category,
      unit_type && ['pallet', 'carton'].includes(unit_type) ? unit_type : cur.unit_type,
      units_per_bundle !== undefined ? Number(units_per_bundle) : cur.units_per_bundle,
      bundle_count !== undefined ? Number(bundle_count) : cur.bundle_count,
      retail_price_ref === '' ? null : (retail_price_ref !== undefined ? Number(retail_price_ref) : cur.retail_price_ref),
      notes !== undefined ? notes : cur.notes,
      req.params.id,
    ]
  );
  res.json(rows[0]);
});

router.delete('/:id', requireRole('manager', 'accountant'), async (req, res) => {
  await pool.query('DELETE FROM bulk_products WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
