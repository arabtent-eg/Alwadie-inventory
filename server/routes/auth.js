const express = require('express');
const { pool } = require('../db');
const { verifyPassword, signToken, setSessionCookie, clearSessionCookie, requireAuth } = require('../auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'missing_fields' });
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE lower(username) = lower($1) AND active = true',
    [username.trim()]
  );
  const user = rows[0];
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'invalid_credentials' });
  }
  const token = signToken(user);
  setSessionCookie(res, token);
  res.json({ id: user.id, username: user.username, display_name: user.display_name, role: user.role });
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, display_name: req.user.display_name, role: req.user.role });
});

module.exports = router;
