require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { initSchema } = require('./db');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const movementsRoutes = require('./routes/movements');
const salesRoutes = require('./routes/sales');
const reportsRoutes = require('./routes/reports');
const syncRoutes = require('./routes/sync');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/movements', movementsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/sync', syncRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not_found' });
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// central error handler so a thrown DB error doesn't crash the process
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error', message: err.message });
});

const PORT = process.env.PORT || 3000;

initSchema()
  .then(() => {
    app.listen(PORT, () => console.log(`wadi-inventory listening on :${PORT}`));
  })
  .catch((e) => {
    console.error('Failed to init schema', e);
    process.exit(1);
  });
