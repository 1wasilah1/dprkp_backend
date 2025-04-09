const User = require('../models/userModel');
const Menu = require('../models/menuModel'); 

// Create User
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, authmenu } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const user = await User.create({ username, password, role, authmenu });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('authmenu');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'authmenu',
        populate: { path: 'parentId', model: 'Menu' }
      });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Gabungkan menu dan parent
    const allMenus = [...user.authmenu];

    const parentMenus = user.authmenu
      .map(m => m.parentId)
      .filter(Boolean)
      .filter((p, i, self) => self.findIndex(x => x._id.toString() === p._id.toString()) === i);

    parentMenus.forEach(parent => {
      if (!allMenus.find(m => m._id.toString() === parent._id.toString())) {
        allMenus.push(parent);
      }
    });

    // Buat tree menu
    const menuMap = {};
    allMenus.forEach(menu => menuMap[menu._id] = { ...menu.toObject(), children: [] });

    const tree = [];
    allMenus.forEach(menu => {
      const parentId = menu.parentId?._id || menu.parentId;
      if (parentId && menuMap[parentId]) {
        menuMap[parentId].children.push(menuMap[menu._id]);
      } else {
        tree.push(menuMap[menu._id]);
      }
    });

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      authmenu: tree
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { username, role, authmenu } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, role, authmenu },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
