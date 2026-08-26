const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireRole } = require('../auth');

const router = express.Router();

// Public (no auth) — the login page needs the logo before the user is authenticated.
router.get('/logo', async (req, res) => {
  const { rows } = await pool.query("SELECT value FROM settings WHERE key = 'logo'");
  res.json({ logo: rows[0] ? rows[0].value : null });
});

router.post('/logo', requireAuth, requireRole('manager'), async (req, res) => {
  const { logo } = req.body || {};
  if (!logo || typeof logo !== 'string' || !logo.startsWith('data:image/')) {
    return res.status(400).json({ error: 'invalid_logo' });
  }
  // rough size guard — base64 payloads run ~1.37x the original byte size, cap around 1.5MB raw
  if (logo.length > 2_000_000) {
    return res.status(413).json({ error: 'logo_too_large' });
  }
  await pool.query(
    `INSERT INTO settings (key, value) VALUES ('logo', $1)
     ON CONFLICT (key) DO UPDATE SET value = $1`,
    [JSON.stringify(logo)]
  );
  res.json({ ok: true });
});

router.delete('/logo', requireAuth, requireRole('manager'), async (req, res) => {
  await pool.query("DELETE FROM settings WHERE key = 'logo'");
  res.json({ ok: true });
});

module.exports = router;
