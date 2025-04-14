const Menu = require('../models/MenuModel');

// Create
exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read All
exports.getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find().sort({ urutan: 1 });
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read By ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateMenu = async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Menu deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
