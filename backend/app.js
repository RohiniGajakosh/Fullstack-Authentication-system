const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Health check (for ALB target group)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;
