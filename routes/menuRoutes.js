const express = require('express');
const router = express.Router();
const {
  createMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu
} = require('../controllers/menuController');

router.post('/', createMenu);
router.get('/', getAllMenu);
router.get('/:id', getMenuById);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

module.exports = router;
