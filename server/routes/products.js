const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole } = require('../auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM products ORDER BY cat_rank ASC, name ASC');
  res.json(rows);
});

const UNIT_TYPES = ['piece', 'carton', 'pallet'];

router.post('/', requireRole('manager', 'accountant'), async (req, res) => {
  const { id, name, category, price, stock, threshold, icon, unit_type, units_per_bundle, salla_linked } = req.body || {};
  if (!id || !name) return res.status(400).json({ error: 'missing_fields' });
  const ut = UNIT_TYPES.includes(unit_type) ? unit_type : 'piece';
  const upb = ut === 'piece' ? 1 : (Number(units_per_bundle) || 1);
  // an item sold only by carton/pallet has no matching Salla SKU of its own — never push its movements to Salla
  const linked = salla_linked === undefined ? (ut === 'piece') : !!salla_linked;
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (id, name, category, cat_rank, icon, price, stock, threshold, unit_type, units_per_bundle, salla_linked)
       VALUES ($1,$2,$3,7,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [String(id), name, category || 'غير مصنف', icon || 'box', price || 0, stock === '' || stock === undefined ? null : stock, threshold || 10, ut, upb, linked]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'product_exists' });
    throw e;
  }
});

router.patch('/:id', requireRole('manager', 'accountant'), async (req, res) => {
  const { category, price, threshold, name, unit_type, units_per_bundle, salla_linked } = req.body || {};
  const fields = []; const values = []; let i = 1;
  if (name !== undefined) { fields.push(`name = $${i++}`); values.push(name); }
  if (category !== undefined) { fields.push(`category = $${i++}`); values.push(category); }
  if (price !== undefined) { fields.push(`price = $${i++}`); values.push(price); }
  if (threshold !== undefined) { fields.push(`threshold = $${i++}`); values.push(threshold); }
  if (unit_type !== undefined && UNIT_TYPES.includes(unit_type)) { fields.push(`unit_type = $${i++}`); values.push(unit_type); }
  if (units_per_bundle !== undefined) { fields.push(`units_per_bundle = $${i++}`); values.push(Number(units_per_bundle) || 1); }
  if (salla_linked !== undefined) { fields.push(`salla_linked = $${i++}`); values.push(!!salla_linked); }
  if (!fields.length) return res.status(400).json({ error: 'no_fields' });
  fields.push(`updated_at = now()`);
  values.push(req.params.id);
  const { rows } = await pool.query(
    `UPDATE products SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`, values
  );
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

module.exports = router;
