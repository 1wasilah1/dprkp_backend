const express = require('express');
const router = express.Router();
const {
    getBeritaTerkini,
    getBeritaBUMD
  } = require('../controllers/newsController');

router.get('/terkini', getBeritaTerkini);
router.get('/bumd', getBeritaBUMD);
module.exports = router;
