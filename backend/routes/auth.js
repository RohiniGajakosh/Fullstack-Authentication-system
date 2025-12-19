const express = require('express');
const router = express.Router();
const db = require('../configs/db');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const rows = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!rows.length) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, rows[0].password);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

module.exports = router;
