const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Login user dan mendapatkan token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Mendapatkan data user yang sedang terautentikasi
// @access  Private (Harus memiliki token)
router.get('/me', authMiddleware, getMe);

module.exports = router;
