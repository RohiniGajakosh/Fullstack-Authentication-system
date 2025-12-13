const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
