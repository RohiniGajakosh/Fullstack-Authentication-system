const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);   // /api/register, /api/login
app.use('/', healthRoutes);    // /health

module.exports = app;
