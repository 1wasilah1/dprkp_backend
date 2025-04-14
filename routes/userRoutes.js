const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const { authMiddleware, roleAuth } = require('../middleware/auth');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authMiddleware, roleAuth('admin'), deleteUser);
// router.delete('/:id', deleteUser);

module.exports = router;
