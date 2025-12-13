const express = require('express');
const router = express.Router();
const auth = require('../controllers/Authcontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome user ${req.user.email}` });
});

module.exports = router;
