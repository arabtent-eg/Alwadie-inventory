const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole, hashPassword } = require('../auth');

const router = express.Router();
router.use(requireAuth);

// list users - manager only
router.get('/', requireRole('manager'), async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, username, display_name, role, active, created_at FROM users ORDER BY created_at ASC'
  );
  res.json(rows);
});

// create user - manager only
router.post('/', requireRole('manager'), async (req, res) => {
  const { username, password, display_name, role } = req.body || {};
  if (!username || !password || !display_name || !role) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  if (!['manager', 'accountant', 'user'].includes(role)) {
    return res.status(400).json({ error: 'invalid_role' });
  }
  if (password.length < 6) return res.status(400).json({ error: 'password_too_short' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (username, password_hash, display_name, role)
       VALUES ($1,$2,$3,$4) RETURNING id, username, display_name, role, active, created_at`,
      [username.trim(), hashPassword(password), display_name.trim(), role]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'username_taken' });
    throw e;
  }
});

// update user (role/active/display_name, optional password reset) - manager only
router.patch('/:id', requireRole('manager'), async (req, res) => {
  const { id } = req.params;
  const { display_name, role, active, password } = req.body || {};
  if (id === req.user.id && active === false) {
    return res.status(400).json({ error: 'cannot_deactivate_self' });
  }
  const fields = [];
  const values = [];
  let i = 1;
  if (display_name !== undefined) { fields.push(`display_name = $${i++}`); values.push(display_name); }
  if (role !== undefined) {
    if (!['manager', 'accountant', 'user'].includes(role)) return res.status(400).json({ error: 'invalid_role' });
    fields.push(`role = $${i++}`); values.push(role);
  }
  if (active !== undefined) { fields.push(`active = $${i++}`); values.push(active); }
  if (password) {
    if (password.length < 6) return res.status(400).json({ error: 'password_too_short' });
    fields.push(`password_hash = $${i++}`); values.push(hashPassword(password));
  }
  if (!fields.length) return res.status(400).json({ error: 'no_fields' });
  values.push(id);
  const { rows } = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, username, display_name, role, active, created_at`,
    values
  );
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

// delete user - manager only
router.delete('/:id', requireRole('manager'), async (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ error: 'cannot_delete_self' });
  await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
