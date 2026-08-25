const { register, login, getUserProfile } = require('../controllers/auth');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;

