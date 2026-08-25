const { register, login, getUserProfile } = require('../controllers/auth');

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;

