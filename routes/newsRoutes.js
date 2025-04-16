const express = require('express');
const router = express.Router();
const { getNewsData } = require('../controllers/newsController');

// Rute untuk mendapatkan data berita berdasarkan kategori
router.get('/', getNewsData);

module.exports = router;
