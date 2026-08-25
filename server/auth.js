const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'wadi_session';
const TOKEN_TTL = '7d';

function hashPassword(pw) {
  return bcrypt.hashSync(pw, 10);
}
function verifyPassword(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}
function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, display_name: user.display_name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}
function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME);
}
function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'not_authenticated' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid_session' });
  }
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'forbidden', needed: roles });
    }
    next();
  };
}
function requireSyncKey(req, res, next) {
  const key = req.get('x-sync-key');
  if (!key || key !== process.env.SYNC_API_KEY) {
    return res.status(401).json({ error: 'invalid_sync_key' });
  }
  next();
}

module.exports = {
  COOKIE_NAME, hashPassword, verifyPassword, signToken,
  setSessionCookie, clearSessionCookie, requireAuth, requireRole, requireSyncKey,
};
